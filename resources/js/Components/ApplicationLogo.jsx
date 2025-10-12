export default function ApplicationLogo({ className = "" }) {
  return (
    <img
      src="/images/logo/logo.png" // path logo perusahaanmu
      alt="PT Sugimura Chemical Indonesia"
      className={"h-12 w-auto " + className}
    />
  );
}