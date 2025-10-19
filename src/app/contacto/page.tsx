"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SocialsList from "@/shared/SocialsList";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useContactForm } from "@/components/Guimel/contact/hooks/useContactForm.hook";
import { Toaster, toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

export interface PageContactProps {}

const info = [
  {
    title: "🗺 DIRECCIÓN",
    desc: "Villas los Pinos 2942, Col. Lomas de San Rafael, CP 33640, Chihuahua, México",
  },
  {
    title: "💌 EMAIL",
    desc: "contacto@guimelcommunity.mx",
  },
  {
    title: "☎ TELÉFONO",
    desc: "+52 443 479 0466",
  },
];

const PageContact: FC<PageContactProps> = ({}) => {
  const { formData, isLoading, error, handleInputChange, handleSubmit } = useContactForm();
  const searchParams = useSearchParams();
  const hasShownToast = useRef(false);
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);

  // Handle predefined message from URL
  useEffect(() => {
    const message = searchParams.get('message');
    if (message && !hasShownToast.current) {
      handleInputChange('message', decodeURIComponent(message));
      // Show welcome toast for scouts only once
      toast.success('¡Genial! Nos encantaría que formes parte de los scouts, ahora completa el formulario', {
        duration: 5000,
      });
      hasShownToast.current = true;
      
      // Highlight the form briefly when coming from scouts section
      setIsFormHighlighted(true);
      setTimeout(() => {
        setIsFormHighlighted(false);
      }, 3000);
    }
  }, [searchParams, handleInputChange]);

  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contacto
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  {item.title === "💌 EMAIL" ? (
                    <a 
                      href={`mailto:${item.desc}`}
                      className="block mt-2 text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {item.desc}
                    </a>
                  ) : item.title === "☎ TELÉFONO" ? (
                    <a 
                      href={`tel:${item.desc.replace(/\s/g, '')}`}
                      className="block mt-2 text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {item.desc}
                    </a>
                  ) : (
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                      {item.desc}
                    </span>
                  )}
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 REDES SOCIALES
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
            <div>
              <form 
                id="contact-form" 
                className={`grid grid-cols-1 gap-6 transition-all duration-1000 ${
                  isFormHighlighted 
                    ? 'ring-4 ring-blue-500 ring-opacity-50 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl shadow-lg' 
                    : ''
                }`} 
                onSubmit={handleSubmit}
              >
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                
                <label className="block">
                  <Label>Nombre</Label>
                  <Input
                    placeholder="Escribe aquí"
                    type="text"
                    className="mt-1"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </label>
                
                <label className="block">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="example@guimel.com"
                    className="mt-1"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </label>
                
                <label className="block">
                  <Label>Teléfono</Label>
                  <Input
                    type="tel"
                    placeholder="+52 123 456 7890"
                    className="mt-1"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </label>
                
                <label className="block">
                  <Label>Mensaje</Label>
                  <Textarea 
                    className="mt-1" 
                    placeholder="Escribe aquí" 
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />
                </label>
                
                <div>
                  <ButtonPrimary type="submit" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                  </ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className="container">
        <SectionSubscribe2 className="pb-24 lg:pb-32" />
      </div>
      
      <Toaster position="bottom-center" closeButton richColors />
    </div>
  );
};

export default PageContact;
