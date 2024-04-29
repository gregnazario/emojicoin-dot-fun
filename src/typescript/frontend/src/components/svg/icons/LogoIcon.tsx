import React from "react";
import { Svg } from "components";

import { SvgProps } from "../types";
import { useThemeContext } from "context";

const Icon: React.FC<SvgProps> = ({ ...props }) => {
  const { theme } = useThemeContext();

  return (
    <Svg viewBox="0 0 170 19" {...props} color="transparent">
      <path
        d="M166.706 10.3821V0.098877H169.993V18.802H166.706V13.6692H164.122V11.1028H161.556V8.5188H159.692V18.802H156.423V0.098877H159.692V5.23169H162.276V7.7981H164.843V10.3821H166.706ZM161.556 7.7981V5.95239H158.972V0.802002H157.126V18.0989H158.972V7.7981H161.556ZM164.122 10.3821V8.5188H162.276V10.3821H164.122ZM167.427 0.802002V11.1028H164.843V12.9485H167.427V18.0989H169.272V0.802002H167.427Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M152.388 15.5325V0.098877H155.675V16.2532H153.108V18.802H144.653V16.2532H142.104V0.098877H145.374V15.5325H152.388ZM144.653 15.5325V0.802002H142.808V15.5325H144.653ZM152.388 18.0989V16.2532H145.374V18.0989H152.388ZM153.108 0.802002V15.5325H154.954V0.802002H153.108Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M127.786 18.802V0.098877H141.356V3.36841H131.056V7.7981H141.356V11.1028H131.056V18.802H127.786ZM128.489 0.802002V18.0989H130.335V10.3821H140.636V8.5188H130.335V2.64771H140.636V0.802002H128.489Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M123.768 15.5325H127.038V18.802H123.768V15.5325ZM126.317 18.0989V16.2532H124.471V18.0989H126.317Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M119.733 10.3821V0.098877H123.02V18.802H119.733V13.6692H117.149V11.1028H114.583V8.5188H112.719V18.802H109.45V0.098877H112.719V5.23169H115.303V7.7981H117.87V10.3821H119.733ZM114.583 7.7981V5.95239H111.999V0.802002H110.153V18.0989H111.999V7.7981H114.583ZM117.149 10.3821V8.5188H115.303V10.3821H117.149ZM120.454 0.802002V11.1028H117.87V12.9485H120.454V18.0989H122.299V0.802002H120.454Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M100.264 3.36841V0.098877H108.684V3.36841H106.118V15.5325H108.684V18.802H100.264V15.5325H102.813V3.36841H100.264ZM100.967 0.802002V2.64771H103.534V16.2532H100.967V18.0989H107.963V16.2532H105.397V2.64771H107.963V0.802002H100.967Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M96.9497 0.098877V2.64771H99.5161V16.2532H96.9497V18.802H88.4946V16.2532H85.9458V2.64771H88.4946V0.098877H96.9497ZM88.4946 15.5325V3.36841H86.6489V15.5325H88.4946ZM96.229 18.0989V16.2532H89.2153V18.0989H96.229ZM96.229 15.5325V3.36841H89.2153V15.5325H96.229ZM96.229 2.64771V0.802002H89.2153V2.64771H96.229ZM98.7954 3.36841H96.9497V15.5325H98.7954V3.36841Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M74.897 3.36841V15.5325H85.1978V18.802H74.1763V16.2532H71.6274V2.64771H74.1763V0.098877H85.1978V3.36841H74.897ZM74.1763 15.5325V3.36841H72.3306V15.5325H74.1763ZM74.897 0.802002V2.64771H84.4771V0.802002H74.897ZM84.4771 16.2532H74.897V18.0989H84.4771V16.2532Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M62.4419 3.36841V0.098877H70.8618V3.36841H68.2954V15.5325H70.8618V18.802H62.4419V15.5325H64.9907V3.36841H62.4419ZM63.145 0.802002V2.64771H65.7114V16.2532H63.145V18.0989H70.1411V16.2532H67.5747V2.64771H70.1411V0.802002H63.145Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M53.2559 3.36841V0.098877H61.6934V16.2532H59.127V18.802H50.6719V16.2532H48.123V10.3821H51.3926V15.5325H58.4062V3.36841H53.2559ZM50.6719 15.5325V11.1028H48.8262V15.5325H50.6719ZM58.4062 18.0989V16.2532H51.3926V18.0989H58.4062ZM53.9766 0.802002V2.64771H59.127V15.5325H60.9727V0.802002H53.9766Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M44.8086 0.098877V2.64771H47.375V16.2532H44.8086V18.802H36.3535V16.2532H33.8047V2.64771H36.3535V0.098877H44.8086ZM36.3535 15.5325V3.36841H34.5078V15.5325H36.3535ZM44.0879 18.0989V16.2532H37.0742V18.0989H44.0879ZM44.0879 15.5325V3.36841H37.0742V15.5325H44.0879ZM44.0879 2.64771V0.802002H37.0742V2.64771H44.0879ZM46.6543 3.36841H44.8086V15.5325H46.6543V3.36841Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M29.752 0.098877H33.0215V18.802H29.752V5.95239H27.8887V8.5188H25.3223V11.1028H22.0176V8.5188H19.4512V5.95239H17.5879V18.802H14.3184V0.098877H17.5879V2.64771H20.1719V5.23169H22.7383V7.7981H24.6016V5.23169H27.168V2.64771H29.752V0.098877ZM19.4512 5.23169V3.36841H16.8672V0.802002H15.0215V18.0989H16.8672V5.23169H19.4512ZM22.0176 7.7981V5.95239H20.1719V7.7981H22.0176ZM24.6016 10.3821V8.5188H22.7383V10.3821H24.6016ZM27.168 7.7981V5.95239H25.3223V7.7981H27.168ZM32.3184 18.0989V0.802002H30.4727V3.36841H27.8887V5.23169H30.4727V18.0989H32.3184Z"
        fill={theme.colors.econiaBlue}
      />
      <path
        d="M0 0.098877H13.5703V3.36841H3.26953V7.7981H13.5703V11.1028H3.26953V15.5325H13.5703V18.802H0V0.098877ZM12.8496 18.0989V16.2532H2.54883V10.3821H12.8496V8.5188H2.54883V2.64771H12.8496V0.802002H0.703125V18.0989H12.8496Z"
        fill={theme.colors.econiaBlue}
      />
    </Svg>
  );
};

export default Icon;