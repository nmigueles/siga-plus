import { StyleSheet } from 'react-native';

import Colors from './colors';

const Styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.white2,
    borderBottomColor: Colors.grey2,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  errorGrey: {
    color: Colors.strongGrey,
    fontSize: 10,
    lineHeight: 20,
  },
  icon: {
    fontSize: 15,
    color: Colors.strongGrey,
    marginTop: 3,
  },
});

export default Styles;
