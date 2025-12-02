import { Course, Instructor, BankDetails } from './types';

export const INSTRUCTORS: Record<string, Instructor> = {
  dolas: {
    id: 'dolas',
    name: 'Dolas Danley',
    role: 'Visual Director & Co-Founder',
    bio: 'A visionary in brand identity and visual storytelling. Dolas brings the fire of creativity with a focus on bold, unapologetic design and 3D environments.',
    image: 'https://picsum.photos/400/400?grayscale',
    color: 'dolas',
  },
  maccus: {
    id: 'maccus',
    name: 'Oladimeji Mark (Maccus)',
    role: 'Technical Lead & Co-Founder',
    bio: 'The architect behind the systems. Maccus specializes in video production logic, high-end editing workflows, and technical precision in motion.',
    image: 'https://picsum.photos/401/401?grayscale',
    color: 'maccus',
  },
};

export const COURSES: Course[] = [
  {
    id: '3d-animation',
    title: '3D Animation & Modeling',
    description: 'Build immersive worlds. Master the art of modeling, texturing, and animating in 3D space using Blender.',
    icon: '3D',
    image: 'https://picsum.photos/seed/3d/800/600',
    price: 2500,
    discountPrice: 1500,
    instructorId: 'dolas',
    prerequisites: ['PC/Mac with GPU', '3-Button Mouse'],
    features: ['Blender Interface', 'Character Rigging', 'Lighting & Rendering', 'Physics Simulations'],
    startDate: 'Dec 15, 2024',
  },
  {
    id: 'video-editing',
    title: 'Pro Video Editing',
    description: 'The art of the cut. Master narrative flow, pacing, and technical workflows in Premiere Pro.',
    icon: 'Video',
    image: 'https://picsum.photos/seed/editing/800/600',
    price: 2500,
    discountPrice: 1500,
    instructorId: 'maccus',
    prerequisites: ['Laptop (8GB RAM recommended)', 'Storage Space'],
    features: ['Timeline Mastery', 'Sound Design', 'Color Grading', 'Export Settings'],
    startDate: 'Dec 15, 2024',
  },
  {
    id: 'motion-design',
    title: 'Motion Design & VFX',
    description: 'Bring static graphics to life. Create kinetic typography, logos, and visual effects using After Effects.',
    icon: 'Motion',
    image: 'https://picsum.photos/seed/motion/800/600',
    price: 2500,
    discountPrice: 1500,
    instructorId: 'maccus',
    prerequisites: ['PC/Mac (16GB RAM)', 'After Effects'],
    features: ['Keyframe Velocity', 'Shape Layers', 'Masking', '3D Camera Tracking'],
    startDate: 'Dec 15, 2024',
  },
];

export const BANK_DETAILS: BankDetails = {
  bankName: 'PalmPay',
  accountNumber: '7038664111',
  accountName: 'Maccus Media Limited',
};

export const MARQUEE_ITEMS = [
  'BLENDER 3D', 'AFTER EFFECTS', 'PREMIERE PRO', 'CINEMA 4D', 'DAVINCI RESOLVE', 'UNREAL ENGINE', 'CAPCUT PC', 'MAYA'
];

export const WHATSAPP_NUMBER = "2348000000000"; // Replace with actual number
