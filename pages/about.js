import { fontSize } from "@mui/system"

export default function About() {
    return (
      <div>
        <h1>About the Digital Response Capture Application</h1>
        <p>
          This application is built for the purpose of studying different reactions
          to music to better understand how a populous feels and thinks about different
          aspects of music.
        </p>
        <h2>How to create a new study</h2>
        <p>
          Navigate and click the '+ NEW STUDY' button in the navigation bar. Once on
          the New Study page, add a Title for the study, a description if wanted, the
          maximum number of study submissions allowed, the Input Profile, and also
          optionally upload an mp3 file to be played on the mobile device.
        </p>
        <h2>Input Profiles</h2>
        <p>
          There are five different controls included, these controls include a Button,
          Vertical Slider, Horizontal Slider, Toggle or Switch, and a Joystick. These
          controls are split up in 17 different configurations. If an Input Profile
          with a Joystick is selected an option will show up for low or high
          sensitivity. High sensitivity lets the data captured to be any whole value
          between 0 - 12. Low sensitivity values are multiples of 0 - 12 but only
          multiples of 1.5 (0 - 1.5 - 3 - etc.)
        </p>
        <h2>Using a study</h2>
        <p>
          After creating a study, you may access that study by clicking its name in the
          list on the 'HOME' page. When selected you may find the 'Study Key' which 
          is the key needed for the study participant to enter on their mobile
          application. After the participant is done with the study and submit it,
          you may see the results of the studies under the respected study on the home
          page.
        </p>
        <p style={{ fontSize: 9 }}>
          Privacy Policy:
          No personal identifiable information is collected from users of the DRC
          Interface mobile application. The only data that is collected is the
          state of various controls at relative timestamps. If the user interacts
          with a control such as a joystick, button, or slider on screen within
          the DRC Interface application, the state of that control will be
          recorded along with the timestamp at which the interaction occurred
          relative to when the user pressed the START button. After the user
          completes their participation in the study by pressing the STOP button
          and confirming their submission, this input data is anonymously and
          securely sent directly to our backend. This input data can then only be
          viewed by the creator and administrator of that particular study.
        </p>
      </div>
    )
  }