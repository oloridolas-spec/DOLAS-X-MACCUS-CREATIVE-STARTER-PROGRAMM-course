
import { Course, Instructor, BankDetails } from './types';

export const INSTRUCTORS: Record<string, Instructor> = {
  dolas: {
    id: 'dolas',
    name: 'Dolas Danley',
    role: 'CEO of Dolas Communication | Founder of Dolas Creative Hub',
    bio: "Dolas Danley is a passionate multimedia creator and digital innovator dedicated to bringing imagination to life through technology. As the CEO of Dolas Communication, he leads a growing creative-tech brand that delivers professional multimedia services — from video editing to animation, design, and digital solutions. He is also the founder of Dolas Creative Hub, a platform built to train, inspire, and empower individuals in digital creativity and multimedia skills. With a natural eye for design, storytelling, and technology, Dolas blends creativity with innovation to transform ideas into meaningful visual experiences. His vision is to become Africa’s leading multimedia and digital innovation hub, transforming ideas into world-class creative solutions while empowering individuals and brands through technology, storytelling, and design.",
    image: 'https://picsum.photos/400/400?grayscale',
    color: 'dolas',
  },
  maccus: {
    id: 'maccus',
    name: 'Oladimeji Mark (Maccus)',
    role: 'CEO of MACCUS TECHNOLOGY | Founder of Mark Perspectives',
    bio: "Oladimeji Mark is a visionary entrepreneur and tech enthusiast passionate about creating innovative digital solutions. As the CEO of MACCUS TECHNOLOGY, he leads a dynamic team focused on delivering cutting-edge tech services and solutions that help businesses grow. He is also the creative force behind Mark Perspectives, a brand identity that reflects his mission to inspire, mentor, and guide individuals and businesses in building strong, authentic brands. With a sharp eye for design, strategy, and technology, Oladimeji combines creativity with practical solutions to bring ideas to life. His vision is to transform ideas into impactful solutions through technology and creativity, empowering individuals and businesses.",
    image: './maccus.jpg',
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
  accountName: 'Olufunke Adetutu',
};

export const MARQUEE_ITEMS = [
  'BLENDER 3D', 'AFTER EFFECTS', 'PREMIERE PRO', 'CINEMA 4D', 'DAVINCI RESOLVE', 'UNREAL ENGINE', 'CAPCUT PC', 'MAYA'
];

export const WHATSAPP_NUMBER = "2348000000000"; // Replace with actual number
export const FORMSPREE_FORM_ID = '01463719ef8e4211aabb759a14e1290a';
export const FORMSPREE_SIGNIN_ENDPOINT = 'https://formspree.io/f/xldklvld';
