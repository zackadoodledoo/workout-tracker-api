import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongodb from '../data/database.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = mongodb.getDb().db();
        const users = db.collection('users');

        let user = await users.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value || null,
            avatar: profile.photos?.[0]?.value || null,
            createdAt: new Date()
          };

          const result = await users.insertOne(newUser);
          user = { _id: result.insertedId, ...newUser };
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = mongodb.getDb().db();
    const user = await db.collection('users').findOne({ _id: id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;