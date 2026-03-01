import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prismaClient';

export const register = async (req: any, res: any) => {
    const { email,username, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error: any) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

export const login = async (req: any, res: any) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '3d' });

        res.json({ message: 'Login successful', token });
    } catch (error: any) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};