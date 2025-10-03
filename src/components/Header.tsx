import Image from 'next/image';

export default function Header() {
  return (
    <header className="relative w-full min-h-screen bg-black flex items-center justify-center p-0 sm:p-4">
      <div className="w-full h-full">
        <div className="relative w-full h-screen max-h-[100vh] sm:h-auto sm:aspect-[16/9] sm:max-h-[70vh] sm:max-w-6xl sm:mx-auto">
          <Image 
            src="/images/header.png"
            alt="Lucky Launch at Lucy"
            fill
            className="object-contain"
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
        </div>
      </div>
    </header>
  );
}
