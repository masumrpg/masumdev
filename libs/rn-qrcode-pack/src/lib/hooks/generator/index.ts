import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { LogoOptions } from '../../types/generator';

type Props = {
  value: string;
  logo?: LogoOptions | undefined;
};

export const useGenerateQrCode = ({value, logo}: Props) => {
  const [matrix, setMatrix] = useState<number[][]>([]);

  useEffect(() => {
    const generate = async () => {
      try {
        // Set error correction level to high if using a logo
        const errorCorrectionLevel = logo ? 'H' : 'M';

        const qr = await QRCode.create(value, { errorCorrectionLevel });
        const { size, data } = qr.modules;
        const newMatrix: number[][] = [];

        for (let i = 0; i < size; i++) {
          newMatrix.push(Array.from(data.slice(i * size, (i + 1) * size)));
        }

        setMatrix(newMatrix);
      } catch (error) {
        console.error('Error generating QR code:', error);
        setMatrix([]);
      }
    };

    generate();
  }, [value, logo]);

  return matrix;
};
