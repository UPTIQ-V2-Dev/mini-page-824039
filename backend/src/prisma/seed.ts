import { PrismaClient, Role } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: adminPassword,
            role: Role.ADMIN,
            isEmailVerified: true
        }
    });

    console.log('✅ Created admin user:', admin.email);

    // Create sample features
    const features = [
        {
            title: 'Fast Performance',
            description: 'Lightning fast application performance',
            icon: 'zap',
            color: 'blue'
        },
        {
            title: 'Secure',
            description: 'Enterprise-grade security features',
            icon: 'shield',
            color: 'green'
        },
        {
            title: 'Scalable',
            description: 'Built to scale with your business needs',
            icon: 'trending-up',
            color: 'purple'
        },
        {
            title: 'Easy to Use',
            description: 'Intuitive interface designed for everyone',
            icon: 'heart',
            color: 'red'
        }
    ];

    for (const featureData of features) {
        const feature = await prisma.feature.upsert({
            where: { title: featureData.title },
            update: {},
            create: featureData
        });
        console.log('✅ Created feature:', feature.title);
    }

    // Create sample contact form submissions
    const contactSubmissions = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            subject: 'Question about features',
            message: 'I would like to know more about your features and pricing.'
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            subject: 'Support request',
            message: 'I need help with setting up my account.'
        },
        {
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            subject: 'Partnership inquiry',
            message: 'I am interested in exploring partnership opportunities.'
        }
    ];

    // Clear existing contact forms and create new ones
    await prisma.contactForm.deleteMany();
    for (const contactData of contactSubmissions) {
        const contactForm = await prisma.contactForm.create({
            data: contactData
        });
        console.log('✅ Created contact submission from:', contactForm.name);
    }
}

main()
    .catch(e => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
