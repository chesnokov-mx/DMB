import Fsection from "@/pages/MainPage/fsection/Fsection.tsx";
import Calculator from "@/pages/MainPage/calc/Calculator.tsx";
import SecondSection from "@/pages/MainPage/secondSection/SecondSection.tsx";
import Footer from "@/pages/MainPage/Footer/Footer.tsx";

const MainPage = () => {
  return (
    <div>
      <Fsection />
      <Calculator />
      <SecondSection />
      <Footer />
    </div>
  );
};

export default MainPage;
