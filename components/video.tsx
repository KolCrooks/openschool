export default function Video(props: { vidLink: string }) {
  return (
    <iframe
      width="250"
      height="200"
      src={props.vidLink}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
