interface OtterLogoProps {
  className?: string;
  size?: number;
}

export const OtterLogo = ({ className = "", size = 40 }: OtterLogoProps) => {
  return (
    <img
      src="/otter-logo.png"
      alt="Koilingua Otter Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};
