"use client";

import {
  Menu,
  Bell,
  Settings,
  Maximize,
  Moon,
  Globe,
  Check,
  Minimize,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import avatar from "@assets/images/avatar.png";
import MenuIcon from "./MenuIcon";

export default function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState("az");
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const languages = [
    { code: "az", name: "Azərbaycan", flag: "🇦🇿" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setIsLanguageModalOpen(false);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function fullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    document.addEventListener("fullscreenchange", fullscreenChange);
    // Prefikslərlə də əlavə edə bilərsən, amma müasir browserlarda lazım deyil
    // document.addEventListener("webkitfullscreenchange", fullscreenChange);
    // document.addEventListener("mozfullscreenchange", fullscreenChange);
    // document.addEventListener("MSFullscreenChange", fullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChange);
      // document.removeEventListener("webkitfullscreenchange", fullscreenChange);
      // document.removeEventListener("mozfullscreenchange", fullscreenChange);
      // document.removeEventListener("MSFullscreenChange", fullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem
          .requestFullscreen()
          .catch((err) => console.error(`Fullscreen error: ${err.message}`));
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        (elem as any).mozRequestFullScreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .catch((err) =>
            console.error(`Exit fullscreen error: ${err.message}`)
          );
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  const onCloseHandler = () => {
    console.log("onClose çağrıldı");
    setNavOpen(false);
  };

  return (
    <header className="bg-[var(--bg)] text-white px-4 py-3 flex items-center justify-between ">
      <div className="flex items-center gap-4">
        <div className="burger-menu cursor-pointer">
          <MenuIcon />
        </div>

        <h5 className="text-lg font-medium ml-5 hidden sm:block">Əsas səhifə</h5>

      </div>

      <div className="flex items-center gap-2">
        <Dialog
          open={isLanguageModalOpen}
          onOpenChange={setIsLanguageModalOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-500"
            >
              <Globe className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Select Language</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{language.flag}</span>
                    <span className="font-medium">{language.name}</span>
                  </div>
                  {selectedLanguage === language.code && (
                    <Check className="h-5 w-5 text-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-600"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            15
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-500"
        >
          <Settings className="h-5 w-5" />
        </Button>

        <Button
          onClick={toggleFullscreen}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-500"
          aria-label={isFullscreen ? "Exit fullscreen" : "Go fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="h-7 w-7" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-500"
        >
          <Moon className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar.src} alt="Mega Soft" />
            <AvatarFallback className="bg-blue-500 text-white text-sm">
              MS
            </AvatarFallback>
          </Avatar>

          <span className="text-sm font-medium hidden sm:inline">
            Mega Soft
          </span>
        </div>
      </div>
    </header>
  );
}
