# Sakura Vancouver v2
View it live: [sakura.andasan.com](https://sakura.andasan.com/).
-

## Installation

```bash
yarn
```

## Usage

```bash
yarn start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Legacy

```bash
import { useState, useEffect } from 'react'
import { Marker, useMap } from "react-leaflet";

import { userIcon } from "components/modules/map/SakuraMapIcons";

const LocationMarker = () => {
const [position, setPosition] = useState(null);

const map = useMap();

useEffect(() => {
    map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
    });
}, [map]);

return position === null ? null : (
        <Marker
            position={position}
            icon={userIcon}
            eventHandlers={{
                click: () => {
                map.flyTo(position, 16);
                }
            }}
        />
    );
}

export default LocationMarker
```

## Earlier version

[Sakura Vancouver v1](https://github.com/andasan/sakura-vancouver)
