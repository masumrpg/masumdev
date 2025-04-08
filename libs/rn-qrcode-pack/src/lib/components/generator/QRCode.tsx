import { QRCodeGeneratorProps } from '../../types/generator'
import { QRCodeGenerator } from './QRCodeGenerator'
import { QRGradient } from './QRGradient';

type QRCodeProps = QRCodeGeneratorProps;

const QRCode = (props: QRCodeProps) => {
  const renderCode = () => {
    return (
      <QRCodeGenerator {...props} />
    );
  };
  return (
    <QRGradient
      width={300}
      height={300}
      type="radial"
      cx="50%"
      cy="50%"
      r="60%"
      stops={[
        { offset: '0%', color: '#FF00FF' },
        { offset: '100%', color: '#00FFFF' },
      ]}
    >
     {renderCode()}
    </QRGradient>
  );
}

export {QRCode}