export default function VideoPlayer({ source }) {
  return (
    <video className="h-full w-full rounded-lg" controls>
      <source src={source} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
