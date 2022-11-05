import Link from '@mui/material/Link'

export default function About() {
  return (
    <div>
      <h1>About the Digital Response Capture Project</h1>
      <p>
        The Digital Response Capture (DRC) project consists of a mobile
        application used for collecting real-time input data from a study
        participant, and this web application used to create the studies and
        view the collected participant data.
        <br />
        <br />
        This project was developed by a group of four students at Southern
        Illinois University Edwardsville for the university&apos;s music
        department and was inspired by the Continuous Response Digital
        Interface, a hardware device historically used in music research.
        <br />
        <br />
        The goal of this project is to give researchers a better way to measure
        and study certain responses to music in order to better understand how
        people feel, think about, and experience different aspects of music.
        <br />
        <br />
        The DRC project is completely open-source and contributions towards its
        continued development and maintenance are welcome and encouraged.
        <br />
        <br />
        <Link href="https://github.com/jwiggenhorn/drc-admin-panel">
          DRC Admin Panel on GitHub
        </Link>
        <br />
        <Link href="https://github.com/jwiggenhorn/drc-app">
          DRC Interface on GitHub
        </Link>
      </p>
      <h2>How to create a new study</h2>
      <p>
        First, click the &apos;+ NEW STUDY&apos; button in the navigation bar at
        the top of the page. On this page you can specify a title for the study,
        a description, the maximum number of study submissions allowed, the
        Input Profile (see below), and also optionally upload an mp3 file to be
        played on the mobile device during their participation.
        <br />
        <br />
        Note: mp3 files are only stored for 30 days, after which the study will
        no longer accept participants. This is to keep the cost of cloud storage
        low and may change in the future.
      </p>
      <h3>Input Profiles</h3>
      <p>
        There are five different controls available: a button, vertical and
        horizontal sliders, a toggle/switch, and a joystick. These controls are
        split up into 17 different configurations called Input Profiles.
        <br />
        <br />
        If an Input Profile with a joystick is selected there is an additional
        option for low or high sensitivity. High sensitivity will capture whole
        numbers between 0 and 12, where 0 is neutral, 12 is up, 3 is right, 6 is
        down, etc. (think of a clock face). Low sensitivity still uses numbers
        in the range of 0 to 12 but rounds to the nearest multiple of 1.5
        (cardinal and ordinal directions).
      </p>
      <h2>Using a study</h2>
      <p>
        After creating a study, you can access it by clicking its name in the
        list of studies on the &apos;HOME&apos; page. When selected you will see
        the study details including the &apos;Study Key&apos; which is a
        randomly generated 5 character alphanumeric code that the study
        participant can enter into the DRC Interface mobile application to load
        the configured input profile and audio (if an mp3 was uploaded) for the
        study.
        <br />
        <br />
        The participant can then participate in the study by pressing the START
        button and interacting with the controls on screen. The
        participant&apos;s inputs are captured along with the timestamps at
        which the inputs occurred, and once they are done they can anonymously
        submit their participation data. This data can then be viewed and
        downloaded by the study creator on the corresponding study page.
        <br />
        <br />
        Note that studies you create are tied to your login email and are only
        visible to you. See <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </div>
  )
}
