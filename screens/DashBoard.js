import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, Pressable, ActivityIndicator, TextInput, BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { endApi } from '../config/endApi';
import MapBackGround from '../baseComponents/MapBackground';
import moment from 'moment';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const ITEMS_PER_PAGE = 5;

const DashBoard = () => {
  const navigation = useNavigation();
  const [complaintsData, setComplaintsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );


    return () => {
      backHandler.remove();
    };
  }, []);


  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        { text: 'Cancel', onPress: () => { console.log("you are exit")}, style: 'cancel' },
        {
          text: 'Exit',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: true }
    );
    return true;
  };

  const getComplaints = async () => {
    setLoading(true);
    const data = await fetch(endApi.getSurakshaComp);
    const jsonData = await data.json();
    const formattedData = jsonData.map(item => ({
      crimeremarks: "Crime",
      registerby: item.registered_by_name,
      register_phone: item.registered_user_phone,
      image: item.crime_file_url,
      latitude: item.latitude,
      longitude: item.longitude,
      gender: item.suspect_gender,
      ...item,
    }));
    const sortedCrimes = formattedData.sort((a, b) => b.report_id - a.report_id);
    setComplaintsData(sortedCrimes);
    setFilteredData(formattedData);
    setLoading(false);
  };

  useEffect(() => {
    getComplaints();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={40} color="black" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      ),
      title: "Crimes",
      headerStyle: {
        backgroundColor: "#e6e6ff",
      },
    });
  }, [navigation]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = complaintsData.filter(item =>
      item.registerby.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const renderPaginationControls = () => {
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginationItems = [];

    if (currentPage > 1) {
      paginationItems.push(
        <TouchableOpacity key="prev" onPress={() => setCurrentPage(currentPage - 1)}>
          <Ionicons name="chevron-back-outline" size={24} color="#007BFF" />
        </TouchableOpacity>
      );
    }

    paginationItems.push(
      <Text key="first" style={styles.pageNumber} onPress={() => setCurrentPage(1)}>
        1
      </Text>
    );

    if (currentPage > 3) paginationItems.push(<Text key="dots1" style={styles.pageDots}>...</Text>);

    if (currentPage > 2) {
      paginationItems.push(
        <Text key="prevPage" style={styles.pageNumber} onPress={() => setCurrentPage(currentPage - 1)}>
          {currentPage - 1}
        </Text>
      );
    }

    paginationItems.push(
      <Text key="current" style={[styles.pageNumber, styles.currentPage]}>
        {currentPage}
      </Text>
    );

    if (currentPage < totalPages - 1) {
      paginationItems.push(
        <Text key="nextPage" style={styles.pageNumber} onPress={() => setCurrentPage(currentPage + 1)}>
          {currentPage + 1}
        </Text>
      );
    }

    if (currentPage < totalPages - 2) paginationItems.push(<Text key="dots2" style={styles.pageDots}>...</Text>);

    if (totalPages > 1) {
      paginationItems.push(
        <Text key="last" style={styles.pageNumber} onPress={() => setCurrentPage(totalPages)}>
          {totalPages}
        </Text>
      );
    }

    if (currentPage < totalPages) {
      paginationItems.push(
        <TouchableOpacity key="next" onPress={() => setCurrentPage(currentPage + 1)}>
          <Ionicons name="chevron-forward-outline" size={24} color="#007BFF" />
        </TouchableOpacity>
      );
    }

    return <View style={styles.pagination}>{paginationItems}</View>;
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("MapScreen", item)} style={styles.card}>
      {
        item.image ?
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        :
        <Image source={require("../assets/no-pictures.png")} style={styles.cardImage} />

      }
      <View style={styles.cardContent}>
        <Text style={styles.crimeRemarks}><FontAwesome name="exclamation-circle" size={16} color="#FF6347" /> {item.crimeremarks}</Text>
        <Text onPress={()=>console.log(item)} style={styles.registerBy}><FontAwesome name="user" size={14} color="#007BFF" /> Reported by: {item.registerby}</Text>
        <Text style={styles.phoneNumber}><Ionicons name="call-outline" size={14} color="#007BFF" /> Contact: {item.register_phone}</Text>
        <Text style={styles.phoneNumber}><MaterialIcons name="date-range" size={14} color="#007BFF" /> Created Date: {moment(item.created_date).format('DD/MM/YYYY')
        }</Text>
      </View>
    </Pressable>
  );

  return (
    <MapBackGround style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by reporter name..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        {loading ? (
          <View style={styles.loading}>
            <FontAwesome name="crosshairs" size={48} color="#FF6347" style={styles.spinner} />
            <Text style={styles.loadingText}>Tracking Crimes...</Text>
          </View>
        ) : (
          <FlatList
            data={getPaginatedData()}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.list}
            ListFooterComponent={renderPaginationControls}
          />
        )}
      </View>
    </MapBackGround>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  crimeRemarks: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 5,
  },
  registerBy: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#007BFF',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF6347',
  },
  spinner: {
    animation: 'rotate 2s linear infinite',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pageNumber: {
    fontSize: 16,
    color: '#007BFF',
    marginHorizontal: 5,
  },
  currentPage: {
    fontWeight: 'bold',
    color: '#FF6347',
  },
  pageDots: {
    fontSize: 16,
    color: '#888',
  },
});
