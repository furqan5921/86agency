import { CirclesWithBar } from "react-loader-spinner";
// import { Plane } from '@bit/mhnpd.react-loader-spinner.plane';
const LoaderComponent = ({ visiblity }) => {
  return (
    <div
      style={{
        display: "flex",
        vh: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CirclesWithBar
        type="Puff"
        color="rgb(83,76,135)"
        height={"100vh"}
        width={100}
        visible={visiblity}
        outerCircleColor="rgb(187,219,192)"
        innerCircleColor="rgb(83,76,135)"
        barColor="rgb(187,219,192)"
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};

export default LoaderComponent;
