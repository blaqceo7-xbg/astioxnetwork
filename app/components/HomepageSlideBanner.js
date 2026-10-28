import { Carousel } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'

const images = [
  "/img/Predictions_Desktop_41d8859b98.svg",
  "/img/perps_dynamic_banner_desktop_5b51a0336d.svg",
  "/img/premium_Banner_Desktop_562d93a234.svg",
];

export const HomepageSlideBanner = () => {
  return (
    <div className="container mx-auto px-5 h-28 w-full md:px-40">
      <Carousel
        slideInterval={4000}
        pauseOnHover
        indicators
      >
        {images.map((src, index) => (
          <a key={index} href="/dashboard" className="relative border rounded-3xl border-neutral-200 h-full w-full">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover rounded-3xl"
              priority={index === 0}
            />
          </a>
        ))}
      </Carousel>
    </div>
  )
}
