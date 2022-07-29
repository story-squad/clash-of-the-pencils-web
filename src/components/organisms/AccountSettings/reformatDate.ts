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
const pattern = /[/-]+/g;
export default function reformatDate(
  dob: string | undefined,
): string | undefined {
  if (dob) {
    const [year, month, day] = dob.split(pattern);
    const newDate = monthNames[parseInt(month) - 1] + ' ' + day + ', ' + year;
    return newDate;
  } else {
    console.log('Date of Birth is Undefined');
  }
}
