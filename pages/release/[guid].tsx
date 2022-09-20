export default function ReleaseGuid() {}

export async function getServerSideProps() {
  // TODO: Possible tracking here to determine popularity of releases

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
