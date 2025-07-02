import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import type { PassportStatic } from "passport";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            return done(null, false, { message: "Email does not exist" });
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return done(null, false, { message: "Password is wrong" });
          }

          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user ?? false);
    } catch (err) {
      done(err);
    }
  });
};
