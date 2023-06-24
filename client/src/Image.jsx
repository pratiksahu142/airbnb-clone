export default function Image({src, ...rest}) {
  return (
      <img {...rest} src={src} alt={''}/>
  );
}