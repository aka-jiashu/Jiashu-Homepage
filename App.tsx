import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Brain,
  Mountain,
  BookOpen,
  Cpu,
  ArrowRight,
  Leaf,
  Snowflake,
  Waves,
  X,
  Github,
  Twitter,
  ExternalLink
} from 'lucide-react';
import wechatPubRaw from './imgs/wechat-pub.jpg';

// --- Types ---
interface ContentSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data ---
const SECTIONS: ContentSection[] = [
  {
    id: 'hero',
    title: '嘉树 Jiashu',
    description: '码农 · 野生心理博主 · 大自然探险家',
    icon: <Terminal className="w-6 h-6" />,
  },
  {
    id: 'psychology',
    title: '阅读与解构',
    description: '热爱阅读，拆解《小王子》寓言旅行中的心理隐喻｜解码《瓦尔登湖》极简生活方式的疗愈力。用阅读解构人性，在冒险中寻找内在秩序。',
    icon: <Brain className="w-6 h-6" />,
  },
  {
    id: 'nature',
    title: '自然与运动',
    description: '热爱运动，雪山滑雪❄️ · 陆地冲浪🏄 · 峰顶读心术。借自然重启认知，年近不惑仍对世界充满好奇。',
    icon: <Mountain className="w-6 h-6" />,
  },
  {
    id: 'tech',
    title: 'AI 与创造力',
    description: '驯化 AI，解放生产力和创造力。带你用程序思维升级心智。',
    icon: <Cpu className="w-6 h-6" />,
  }
];

const BLOG_LINKS: Record<string, string> = {
  psychology: '/blog/category/%E9%98%85%E8%AF%BB%E4%B8%8E%E8%A7%A3%E6%9E%84.html',
  nature: '/blog/',
  tech: '/blog/category/ai-%E4%B8%8E%E5%88%9B%E9%80%A0%E5%8A%9B.html',
};

// --- Components ---

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
    <div className="max-w-6xl mx-auto px-5 md:px-6 h-14 flex items-center justify-between">
      <div className="text-xl font-bold tracking-tight text-emerald-900 flex items-center gap-2">
        <Leaf className="w-5 h-5 text-emerald-600" />
        <span className="text-base md:text-lg">嘉树</span>
      </div>
      <div className="flex gap-4 md:gap-6 text-sm font-medium text-stone-600">
        <a href={BLOG_LINKS.psychology} className="hover:text-emerald-700 transition-colors">心理</a>
        <a href={BLOG_LINKS.nature} className="hover:text-emerald-700 transition-colors">自然</a>
        <a href={BLOG_LINKS.tech} className="hover:text-emerald-700 transition-colors">科技</a>
      </div>
    </div>
  </nav>
);

const TYPEWRITER_LINES = [
  '像写代码一样理解人性',
  '在自然里重启认知系统',
  '用 AI 放大创造力与行动力',
];

const TypewriterHeading = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentLine = TYPEWRITER_LINES[lineIndex];

    if (!isDeleting && charCount === currentLine.length) {
      const holdTimer = setTimeout(() => setIsDeleting(true), 1300);
      return () => clearTimeout(holdTimer);
    }

    if (isDeleting && charCount === 0) {
      setIsDeleting(false);
      setLineIndex((prev) => (prev + 1) % TYPEWRITER_LINES.length);
      return;
    }

    const speed = isDeleting ? 38 : 75;
    const timer = setTimeout(() => {
      setCharCount((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, lineIndex]);

  const output = TYPEWRITER_LINES[lineIndex].slice(0, charCount);

  return (
    <h1 className="text-3xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight min-h-[86px] md:min-h-[116px]">
      <span className="block text-stone-500 text-sm md:text-base font-medium mb-1">aka-jiashu.blog().</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600">
        {output}
      </span>
      <span className="typewriter-cursor text-emerald-700 ml-1">|</span>
    </h1>
  );
};

const FollowModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-fade-in-up">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-stone-900">关注我</h3>

          <div className="flex flex-col gap-3">
            <a
              href="https://x.com/akajiashu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 font-medium hover:border-stone-900 hover:bg-stone-100 transition-all group"
            >
              <Twitter className="w-5 h-5 group-hover:text-[#1DA1F2]" />
              <span>Twitter / X</span>
              <ExternalLink className="w-4 h-4 text-stone-400 ml-auto" />
            </a>

            <a
              href="https://github.com/aka-jiashu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 font-medium hover:border-stone-900 hover:bg-stone-100 transition-all group"
            >
              <Github className="w-5 h-5 group-hover:text-black" />
              <span>GitHub</span>
              <ExternalLink className="w-4 h-4 text-stone-400 ml-auto" />
            </a>
          </div>

          <div className="pt-4 border-t border-stone-100">
            <div className="text-sm font-medium text-stone-500 mb-4">微信公众号：博约精一</div>
            <div className="w-40 h-40 mx-auto bg-stone-100 rounded-xl overflow-hidden p-2 border border-stone-200">
              <img
                src={wechatPubRaw}
                alt="微信公众号：博约精一"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="mt-3 text-xs text-stone-400">扫码关注，一起成长</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ section, imageUrl, onFollowClick }: { section: ContentSection; imageUrl: string | null; onFollowClick: () => void }) => {
  return (
    <header className="relative pt-22 md:pt-24 pb-8 md:pb-10 px-5 md:px-6 min-h-[52vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-90 animate-fade-in"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-200 to-emerald-100 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-50/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 md:space-y-5 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/60 border border-emerald-200 text-emerald-800 text-xs md:text-sm font-medium backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Thinking via Code & Nature
        </div>

        <TypewriterHeading />

        <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          {section.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-1.5">
          <button
            onClick={onFollowClick}
            className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-sm md:text-base font-medium hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-stone-900/20"
          >
            关注我 <ArrowRight className="w-4 h-4" />
          </button>
          <a href="/blog/" className="px-6 py-2.5 rounded-full bg-white border border-stone-200 text-sm md:text-base text-stone-700 font-medium hover:border-emerald-500 hover:text-emerald-700 transition-all shadow-sm">
            了解更多
          </a>
        </div>
      </div>
    </header>
  );
};

const FeatureCard = ({
  section,
  imageUrl,
  reverse = false
}: {
  section: ContentSection;
  imageUrl: string | null;
  reverse?: boolean
}) => {
  return (
    <section
      id={section.id}
      className="py-8 md:py-9 px-5 md:px-6 max-w-6xl mx-auto cursor-pointer"
      onClick={() => window.location.href = BLOG_LINKS[section.id] || '/blog/'}
    >
      <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-7 ${reverse ? 'md:flex-row-reverse' : ''}`}>

        {/* Content Side */}
        <div className="flex-1 space-y-3.5 md:space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
            {section.icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900">{section.title}</h2>
          <div className="h-1 w-16 bg-emerald-500 rounded-full"></div>
          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            {section.description}
          </p>

          <div className="pt-1 flex gap-2 text-xs md:text-sm font-medium text-stone-500">
            {section.id === 'psychology' && (
              <>
                <span className="px-3 py-1 bg-stone-100 rounded-lg">#小王子</span>
                <span className="px-3 py-1 bg-stone-100 rounded-lg">#瓦尔登湖</span>
              </>
            )}
            {section.id === 'nature' && (
              <>
                <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg"><Snowflake className="w-3 h-3" /> 滑雪</span>
                <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-lg"><Waves className="w-3 h-3" /> 陆冲</span>
              </>
            )}
            {section.id === 'tech' && (
              <>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg">#AI</span>
                <span className="px-3 py-1 bg-stone-100 rounded-lg">#生产力</span>
              </>
            )}
          </div>
        </div>

        {/* Image Side */}
        <div className="flex-1 w-full">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl shadow-stone-200 group">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={section.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-stone-200 animate-pulse flex items-center justify-center text-stone-400">
                <span className="flex flex-col items-center gap-2">
                  <span className="loading-spinner">✨</span>
                  Loading...
                </span>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/20 to-transparent pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-stone-900 text-stone-400 py-6 px-5 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-5">
      <div className="flex items-center gap-2 text-stone-100 font-bold text-lg">
        <Leaf className="w-5 h-5 text-emerald-500" />
        嘉树 Jiashu
      </div>
      <div className="text-center md:text-right text-sm">
        <p>用程序思维升级心智 🌱</p>
        <p className="mt-2 text-stone-600">© {new Date().getFullYear()} All rights reserved.</p>
        <p className="mt-2">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-stone-300 transition-colors"
          >
            蜀ICP备2026006995号-1
          </a>
        </p>
      </div>
    </div>
  </footer>
);

function App() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);

  useEffect(() => {
    // Load all images from the imgs directory
    const globImages = import.meta.glob('./imgs/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });

    const newImages: Record<string, string> = {};

    SECTIONS.forEach(section => {
      // Find all images that start with the section id (e.g., 'hero1.png', 'hero2.png' for 'hero')
      const matchingImages = Object.keys(globImages).filter(path => {
        const filename = path.split('/').pop();
        return filename?.startsWith(section.id);
      });

      if (matchingImages.length > 0) {
        // Pick a random image from the matches
        const randomPath = matchingImages[Math.floor(Math.random() * matchingImages.length)];
        newImages[section.id] = globImages[randomPath] as string;
      }
    });

    setImages(newImages);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-emerald-200 selection:text-emerald-900">
      <Navigation />

      <main>
        <Hero
          section={SECTIONS[0]}
          imageUrl={images['hero'] || null}
          onFollowClick={() => setIsFollowModalOpen(true)}
        />

        <FeatureCard
          section={SECTIONS[1]}
          imageUrl={images['psychology'] || null}
        />

        <FeatureCard
          section={SECTIONS[2]}
          imageUrl={images['nature'] || null}
          reverse={true}
        />

        <FeatureCard
          section={SECTIONS[3]}
          imageUrl={images['tech'] || null}
        />
      </main>

      <div className="py-8 md:py-10 bg-emerald-50 px-5 md:px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-3.5">
          <BookOpen className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="text-2xl md:text-3xl font-bold text-stone-900">
            关注我，带你用程序思维升级心智
          </h3>
          <p className="text-sm md:text-base text-stone-600">
            Decoding humanity through reading | Rebooting cognition through nature
          </p>
          <button
            onClick={() => setIsFollowModalOpen(true)}
            className="mt-3 px-6 py-2.5 rounded-full bg-stone-900 text-white text-sm md:text-base font-medium hover:bg-stone-800 transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-stone-900/20"
          >
            关注我 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Footer />

      <FollowModal
        isOpen={isFollowModalOpen}
        onClose={() => setIsFollowModalOpen(false)}
      />
    </div>
  );
}

export default App;
