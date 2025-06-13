import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import visaLogo from "../assets/Visa_Logo.png";
import mastercardLogo from "../assets/Mastercard-logo.svg";
import chipImg from "../assets/emv-chip.jpg";
import wifiImg from "../assets/contactless symbol.webp";

const mockCards = [
  {
    id: 1,
    bank: "KCB",
    number: "**** **** **** 1234",
    holder: "Emilio Karuga",
    expiry: "12/26",
    type: "visa",
    CVV: "123",
    color: "bg-gradient-to-r from-indigo-500 to-blue-600",
  },
  {
    id: 2,
    number: "**** **** **** 5678",
    holder: "Emilio Karuga",
    expiry: "09/25",
    type:"mastercard",
    CVV: "120",
    color: "bg-gradient-to-r from-yellow-500 to-orange-600",
  }, 
];

export default function Cards() {
  const [flippedStates, setFlippedStates] = useState<{ [key: number]: boolean }>({});

  const toggleFlip = (id: number) => {
    setFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCards.map((card) => {
          const logo = card.type === "visa" ? visaLogo : mastercardLogo;
          const isFlipped = flippedStates[card.id];

          return (
            <div 
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="relative w-[320px] h-[200px] perspective cursor-pointer">

                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}>
                    {/*Front Side */}
                    <div className={`absolute w-full h-full rounded-xl p-4 shadow-lg text-white ${card.color} backface-hidden`}>
                      <div className="flex justify-between">
                        <img src={chipImg} alt="chip" className="w-10 h-8 object-contain" />
                        <img src={wifiImg} alt="wifi" className="w-10 h-8 object-contain" />
                      </div>

                      <div 
                        className="mt-6 text-xl tracking-widest px-2 font-mono"
                        style={{ fontFamily: "OCR A std, monospace" }}>
                          {card.number}
                      </div>

                      <div className="flex justify-between mt-4 text-sm font-mono px-2">
                        <div>
                          <div className="uppercase text-xs">Valid Thru</div>
                        <div>{card.expiry}</div>
                      </div>
                      <img src={logo} alt={card.type} className="object-contain w-12 h-auto" />
                    </div>

                    <div className="absolute bottom-1 left-4 text-base font-semibold tracking-wide">
                      {card.holder}
                    </div>
                </div>

                {/*Backside*/}
                <div className="absolute w-full h-full rounded-xl bg-gray-800 text-white p-4 shadow-xl rotate-y-180 backface-hidden">
                  <div className="w-full h-10 bg-black mb-6 rounded-sm"></div>

                  <div className="text-xs">Authorized Signature</div>
                  <div className="relative w-full h-8 bg-gray-200 mt-1 rounded-sm">
                    <div className="absolute right-2 top-1 text-xs text-black font-bold">CVV: {card.CVV}</div>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <img src={logo} alt={card.type} className="w-12" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex items-center justify-center border-2 border-dashed rounded-xl p-6 text-gray-400 hover:text-blue-500 cursor-pointer transitions">
          <FaPlus className="mr-2" /> Add Card
        </div>
      </div>
    </div>
  );
}