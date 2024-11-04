import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtUserPayload } from "../types";
import { Request } from "express";

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy,"access-user") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_CUSTOMER_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request,payload: JwtUserPayload) {
    // console.log("req", req);
    console.log("payload", payload);
    if(payload.is_active && String(payload.id) !== req.params.id){
      throw new UnauthorizedException("Ruxsat yo'q");
    }

    return payload;
  }
}
