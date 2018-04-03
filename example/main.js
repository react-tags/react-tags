// Set up test data
const Countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua &amp; Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia &amp; Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Cape Verde',
  'Cayman Islands',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Cote D Ivoire',
  'Croatia',
  'Cruise Ship',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Polynesia',
  'French West Indies',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kuwait',
  'Kyrgyz Republic',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Pierre &amp; Miquelon',
  'Samoa',
  'San Marino',
  'Satellite',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'South Africa',
  'South Korea',
  'Spain',
  'Sri Lanka',
  'St Kitts &amp; Nevis',
  'St Lucia',
  'St Vincent',
  'St. Lucia',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  "Timor L'Este",
  'Togo',
  'Tonga',
  'Trinidad &amp; Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks &amp; Caicos',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (US)',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];


const suggestions = Countries.map((country) => {
  return {
    id: country,
    text: country
  }
})
/*
 * If your app already uses react-dnd, then having multiple
 * backend will raise an integrity violation exception. In such cases
 * use the WithOutContext version of the component.
 * var Tags = ReactTags.WithOutContext;
 * The example below uses the `WithContext` since this the sole component
 * using the react-dnd component.
*/
const Tags = ReactTags.WithContext;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [{ id: 'Thailand', text: 'Thailand' }, { id: 'India', text: 'India' }],
      suggestions: suggestions,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    const { tags } = this.state;
    this.setState({ tags: [...tags, ...[tag]] });
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  handleTagClick(index) {
    console.log('The tag at index ' + index + ' was clicked');
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div>
        <Tags
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
