import { CursorProvider } from '@/components/CustomCursor';
import { SoundProvider } from '@/components/SoundControl';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { LatestReleases } from '@/components/LatestReleases';
import { MerchSection } from '@/components/MerchSection';
import { PhotoArchive } from '@/components/PhotoArchive';
import { VideoSection } from '@/components/VideoSection';
import { Footer } from '@/components/Footer';

export default function App() {
  return (
    <CursorProvider>
      <SoundProvider>
        <LoadingScreen />
        <div className="grain-layer" aria-hidden="true" />
        <Header />
        <main>
          <Hero />
          <LatestReleases />
          <MerchSection />
          <PhotoArchive />
          <VideoSection />
        </main>
        <Footer />
      </SoundProvider>
    </CursorProvider>
  );
}
