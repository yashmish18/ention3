import { Fade } from "react-awesome-reveal";
import ItemImage from "./ItemImage";

const E4Feature = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <div className="flex flex-col gap-4">
        <Fade direction="left">
          <ItemImage
            img="/assets/0N1A1389.png"
            label={
              <p
                className={`absolute text-center text-[24px] min-[450px]:text-[42px] lg:text-[40px] xl:text-[50px] font-bold`}
              >
                Mic Bulit-in, Analog microphone
              </p>
            }
          />
        </Fade>
        <Fade direction="left">
          <ItemImage
            img="/assets/0N1A1389.png"
            label={
              <div className={`absolute text-center flex flex-col`}>
                <p className="text-[42px] lg:text-[66px] font-bold">
                  Narrow Bezel
                </p>
                <p className="text-[24px] lg:text-4xl font-bold">
                  Anti-glare display
                </p>
              </div>
            }
          />
        </Fade>
        <Fade direction="left">
          <ItemImage
            img="/assets/0N1A1389.png"
            label={
              <p
                className={`absolute text-center font-bold text-[32px] min-[450px]:text-[36px] lg:text-[50px] bottom-4`}
              >
                15.6inch, full HD 1920*1080
              </p>
            }
          />
        </Fade>
        <Fade direction="left">
          <ItemImage
            img="/assets/0N1A1389.png"
            label={
              <div
                className={`absolute text-center flex flex-row items-center justify-between gap-4`}
              >
                <div>
                  <p className="text-[42px] lg:text-[50px] font-bold">
                    Intel i7
                  </p>
                  <p className="text-[24px] lg:text-3xl font-bold">13620</p>
                </div>
                <p className="text-[24px] lg:text-3xl font-bold">or</p>
                <div>
                  <p className="text-[42px] lg:text-[50px] font-bold">
                    Intel i5
                  </p>
                  <p className="text-[24px] lg:text-3xl font-bold">1235U</p>
                </div>
              </div>
            }
          />
        </Fade>
      </div>
      <div className="flex flex-col gap-4">
        <Fade direction="right">
          <ItemImage
            img="/assets/0N1A1389.png"
            label={
              <p
                className={`absolute text-center text-[42px] lg:text-[60px] font-medium`}
              >
                Windows 11 Pro
              </p>
            }
          />
        </Fade>
        <Fade direction="right">
          <ItemImage
            img="/assets/0N1A1389.png"
            label={
              <div className={`absolute text-center bottom-4 flex flex-col`}>
                <p className="text-[32px] min-[450px]:text-[42px] lg:text-[66px] font-bold">
                  5000mah -19V, 65W
                </p>
                <p className="text-[18px] min-[450px]:text-[24px] lg:text-[31px] font-bold">
                  Lathium-ion polymer battery
                </p>
              </div>
            }
          />
        </Fade>
        <Fade direction="right">
          <ItemImage
            img="/assets/0N1A1389.png"
            label={
              <div
                className={`absolute left-8 flex flex-col text-[24px] min-[450px]:text-[28px] xl:text-[40px]`}
              >
                <p className="font-bold">Dual band wifi</p>
                <p className="font-medium">2.4GHz and 5GHz</p>
              </div>
            }
          />
        </Fade>
        <Fade direction="right">
          <ItemImage
            img="/assets/0N1A1389.png"
            label={
              <p className="absolute text-white font-bold text-[28px] min-[450px]:text-[32px] xl:text-[44px] top-3">
                Thin and light{" "}
                <span className="text-[16px] xl:text-xl">1.68Kg</span>
              </p>
            }
          />
        </Fade>
      </div>
    </div>
  );
};

export default E4Feature;
