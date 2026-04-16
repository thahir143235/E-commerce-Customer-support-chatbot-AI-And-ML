  
    "use client";

import { useState, useRef } from "react";
import { MessageCircle, X, Mic } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { error } from "console";

type QA = {
  q: string;
  a: string;
  keywords: string[];
};

type Product = {
  label: string;
  qa: QA[];
};

const productFAQ: Record<string, Product> = {
  ultralaptop: {
    label: "Ultra Laptop Pro",
    qa: [
      {
        q: "What is the price?",
        a: "The price of Ultra Laptop Pro is ₹1,29,599.",
        keywords: ["price", "cost"],
      },
      {
        q: "Is it good for coding?",
        a: "Yes, it is excellent for coding and professional development work.",
        keywords: ["coding", "programming"],
      },
      {
        q: "What are the specifications?",
        a: "It has Intel i7 processor, 16GB RAM and 512GB SSD storage.",
        keywords: ["specifications", "specs", "ram", "storage"],
      },
    ],
  },

  gaminglaptop: {
    label: "Gaming Laptop",
    qa: [
      {
        q: "What is the price?",
        a: "The Gaming Laptop costs ₹1,59,009.",
        keywords: ["price"],
      },
      {
        q: "Is it good for gaming?",
        a: "Yes, it includes a dedicated graphics card for high-end gaming.",
        keywords: ["gaming", "games"],
      },
      {
        q: "Does it support heavy software?",
        a: "Yes, it supports video editing and heavy applications.",
        keywords: ["software", "heavy", "editing"],
      },
    ],
  },

  smartphone: {
    label: "Smartphone X",
    qa: [
      {
        q: "What is the price?",
        a: "The Smartphone X price is ₹40,899.",
        keywords: ["price"],
      },
      {
        q: "How is the camera?",
        a: "It has a powerful high-resolution camera suitable for photography.",
        keywords: ["camera", "photo"],
      },
      {
        q: "Is it 5G supported?",
        a: "Yes, it supports 5G connectivity.",
        keywords: ["5g", "network"],
      },
    ],
  },
};

export default function ProductAssistant() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [answer, setAnswer] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // 🔊 Voice Output
  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    utter.rate = 1;
    utter.pitch = 1;

    synth.speak(utter);
  };

  // 🎤 Stable Voice Recognition
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    window.speechSynthesis.cancel(); // stop speaking before listening

    setListening(true);

    let finalTranscript = "";

    recognition.start();

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
    };

    recognition.onerror = () => {
      setListening(false);
      recognition.stop();
    };

    recognition.onend = () => {
      setListening(false);

      if (finalTranscript.trim() !== "") {
        findAnswerByVoice(finalTranscript.toLowerCase());
      }
    };

    // Auto stop after 6 seconds
    setTimeout(() => {
      recognition.stop();
    }, 6000);
  };

  const findAnswerByVoice = (speech: string) => {
    for (const product of Object.values(productFAQ)) {
      for (const qa of product.qa) {
        if (qa.keywords.some((k) => speech.includes(k))) {
          setAnswer(qa.a);
          speak(qa.a);
          return;
        }
      }
    }

    const fallback =
      "Sorry, I couldn't understand your question. Please ask about price, specifications or features.";

    setAnswer(fallback);
    speak(fallback);
  };

  const handleQuestionClick = (ans: string) => {
    setAnswer(ans);
    speak(ans);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 bg-primary text-white p-4 rounded-full shadow-lg z-50"
      >
        <MessageCircle />
      </button>

      {open && (
        <Card className="fixed bottom-20 right-5 w-[400px] p-4 z-50 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Product Assistant</h3>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          {!selectedProduct && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Select a product</p>
              {Object.values(productFAQ).map((product, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.label}
                </Button>
              ))}
            </div>
          )}

          {selectedProduct && (
            <>
              <p className="font-semibold mb-2">
                {selectedProduct.label}
              </p>

              <div className="space-y-2 mb-4">
                {selectedProduct.qa.map((item, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    className="w-full text-left"
                    onClick={() => handleQuestionClick(item.a)}
                  >
                    {item.q}
                  </Button>
                ))}
              </div>

              <Button
                className="w-full flex gap-2"
                onClick={startListening}
                variant={listening ? "secondary" : "default"}
              >
                <Mic />
                {listening ? "Listening..." : "Ask by Voice"}
              </Button>

              {answer && (
                <div className="mt-4 p-3 bg-muted rounded text-sm">
                  {answer}
                </div>
              )}

              <Button
                variant="ghost"
                className="w-full mt-2"
                onClick={() => {
                  setSelectedProduct(null);
                  setAnswer("");
                }}
              >
                ← Back to products
              </Button>
            </>
          )}
        </Card>
      )}
    </>
  );
}
