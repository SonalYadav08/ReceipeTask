import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainView: {
    marginVertical: 40,
  },
  profieImgContainer: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    width: 100,
    alignSelf: 'center',
    borderRadius: 300,
    height: 100,
    justifyContent: 'center',
  },
  profileImg: {
    height: 70,
    width: 90,
    borderRadius: 160,
  },
  detailView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  data: {
    fontSize: 18,
    color: 'orange',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: 'orange',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 60,
  },
  loginBtnText: {color: 'white', fontSize: 18, fontWeight: 'bold'},
});

export default styles;
