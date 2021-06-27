import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const InviteFriends = () => (
  <Svg
    height={20}
    viewBox="0 -34 512 512"
    width={20}
    fill="#323232"
    stroke="#323232"
    strokeWidth={20}
  >
    <Path d="M432 0H80C35.887 0 0 35.887 0 80v231c0 44.113 35.887 80 80 80h144c11.047 0 20-8.953 20-20s-8.953-20-20-20H80c-22.055 0-40-17.945-40-40V85.637L213.754 193.68c13.031 8.101 27.637 12.152 42.246 12.152s29.215-4.05 42.246-12.152L472 85.637V156c0 11.047 8.953 20 20 20s20-8.953 20-20V80c0-44.113-35.887-80-80-80zM277.121 159.71c-13.027 8.102-29.215 8.102-42.242 0L55.676 48.278C62.422 43.094 70.856 40 80 40h352c9.145 0 17.582 3.094 24.324 8.277zM409.59 221.56L299.785 331.117a20.012 20.012 0 00-5.012 8.348l-23.91 78.722A20 20 0 00290 444c1.781 0 3.574-.238 5.34-.727l80.723-22.359a19.972 19.972 0 008.789-5.121l109.574-109.367c23.394-23.395 23.394-61.457 0-84.852s-61.457-23.394-84.836-.015zm-49.274 162.21l-40.613 11.25 11.887-39.128 74.09-73.926 28.289 28.289zm105.84-105.64l-3.875 3.867-28.285-28.285 3.86-3.856c7.796-7.796 20.488-7.796 28.285 0 7.8 7.801 7.8 20.489.015 28.274zm0 0" />
  </Svg>
);

export default InviteFriends;
