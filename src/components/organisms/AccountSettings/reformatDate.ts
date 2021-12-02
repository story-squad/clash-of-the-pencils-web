const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function reformatDate(
  dob: string | undefined,
): string | undefined {
  if (dob) {
    const [year, month, day] = dob.split('-');
    const newDate =
      // adding a day becuase it is subracting a day somewhere so things work
      monthNames[parseInt(month) - 1] + ' ' + [parseInt(day) + 1] + ', ' + year;
    return newDate;
  } else {
    console.log('Date of Birth is Undefined');
  }
}
