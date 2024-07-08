
import {ReactPhotoSphereViewer} from "react-photo-sphere-viewer";

export default function Panorama() {
    return (
        <div className="App">
            <ReactPhotoSphereViewer src={'/assets/images/panorama/test.jpg'} height={'100vh'} width={"100%"} littlePlanet={true}></ReactPhotoSphereViewer>
        </div>
    );
    }