import { Request, Response } from 'express';
import { oauth2Client, scopes } from '../lib/googleOAuth';

import {google} from "googleapis"
import prisma from '../lib/prismaClient';


export const googleAuth = (req: any, res: any) => {
    const userId = req.userId; // userId is set by auth middleware
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent',
        state: userId.toString() // Pass userId in state to identify the user in the callback
    });
    res.redirect(authUrl);
};

export const googleCallback = async (req: Request, res: Response) => {
    try {
        const {code, state} = req.query as any;
        const userId = parseInt(state as string); // Retrieve userId from state sent from auth route
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
        const userInfo = await oauth2.userinfo.get();

        await prisma.user.update({
            where: { email: userInfo.data.email },
            data: { 
                googleAccessToken: tokens.access_token,
                googleRefreshToken: tokens.refresh_token,
                googleTokenExpiry: tokens.expiry_date
             }
         })
        
         res.redirect('/');
    } catch (error) {
        console.error('Google OAuth error:', error);
        res.status(500).send('Authentication failed');
    }
};