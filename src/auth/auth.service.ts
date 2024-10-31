import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { Tokens } from '../common/types';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { SignInAdminDto } from './dto/sign-in-admin.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}
  async generateAdminTokens(admin: Admin): Promise<Tokens> {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_ADMIN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateAdminRefreshToken(adminId: number, refresh_token: string) {
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 3);
    await this.adminService.updateRefreshToken(adminId, hashed_refresh_token);
  }

  async signUpAdmin(createAdminDto: CreateAdminDto, res: Response) {
    const newAdmin = await this.adminService.create(createAdminDto);

    if (!newAdmin) {
      throw new InternalServerErrorException("Yangi Admin qo'shishda xatolik");
    }

    const tokens = await this.generateAdminTokens(newAdmin);
    await this.updateAdminRefreshToken(newAdmin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return { id: newAdmin.id, access_token: tokens.access_token };
  }

  async signInAdmin(signInAdminDto: SignInAdminDto, res: Response) {
    const admin = await this.adminService.findByLogin(signInAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException('Email or Password incrrect');
    }

    const validPassword = await bcrypt.compare(
      signInAdminDto.password,
      admin.hashed_password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Email or Password incrrect');
    }

    admin.is_active = true;
    await admin.save();

    const tokens = await this.generateAdminTokens(admin);
    await this.updateAdminRefreshToken(admin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return {
      message: 'Admin signed in succesfully',
      id: admin.id,
      access_token: tokens.access_token,
    };
  }

  async signOutAdmin(refresh_token: string, res: Response) {
    try {
      if (!refresh_token) {
        throw new BadRequestException('Refresh token is required');
      }
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
      });
      if (!payload){
        throw new BadRequestException('Invalid refresh token1');
      }
      // console.log(payload)
      const admin = await this.adminService.findByLogin(payload.email);
      if (!admin) {
        throw new BadRequestException('Invalid refresh token2');
      }
      admin.is_active = true;
      admin.hashed_refresh_token = null;
      admin.save();

      res.clearCookie('refresh_token');

      return { message: 'Admin signed  out' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async refreshAdminToken(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
      });
      const admin = await this.adminService.findByLogin(payload.email);
      if (!admin) {
        throw new BadRequestException('Invalid refresh token');
      }

      const validRefreshToken = await bcrypt.compare(
        refresh_token,
        admin.hashed_refresh_token,
      );

      if (!validRefreshToken) {
        throw new ForbiddenException('Invalid refresh token');
      }

      const tokens = await this.generateAdminTokens(admin);
      await this.updateAdminRefreshToken(admin.id, tokens.refresh_token);
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: +process.env.COOKIE_TIME,
        httpOnly: true,
      });

      return {
        message: 'Token refreshed successfully',
        id: admin.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
