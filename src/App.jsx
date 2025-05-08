import Header from "./header";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import TaskBoard from "./task/TaskBoard";
export default function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <HeroSection />
        <TaskBoard />
      </div>
      <Footer />
    </>
  );
}
