import React, { useState, useEffect , useRef} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Button,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { PdfCode } from "./pdfCode";
import * as FileSystem from "expo-file-system";

const GenerateIdentity = () => {
  const [name, setname] = useState("");
  const [department, setdepartment] = useState("");
  const [academicSession, setacademicSession] = useState("");
  const [rollNo, setrollNo] = useState("");
  const [regNo, setregNo] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [address, setaddress] = useState("");
  const [district, setdistrict] = useState("");
  const [pinCode, setpinCode] = useState("");
  const [studentContactNo, setstudentContactNo] = useState("");
  const [guardianNo, setguardianNo] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  ////////////======================Upload your Current Image======================////////////

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      let imageUri;
  
      if (result.assets && result.assets.length > 0) {
        imageUri = result.assets[0].uri;
      } else {
        imageUri = result.uri;
      }
  
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      setSelectedImage(`data:image/jpeg;base64,${base64Image}`);
    }
  };

  //=====================================End===============================================//

  ////////////======================Generate Pdf And Print======================////////////

  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url,
    });
  };

  const printToFile = async () => {
    if (
      !name ||
      !department ||
      !academicSession ||
      !rollNo ||
      !regNo ||
      !bloodGroup ||
      !address ||
      !district ||
      !pinCode ||
      !studentContactNo ||
      !guardianNo ||
      !selectedImage
    ) {
      showAlert("Please fill in all required fields and select an image");
      return;
    }
    let html = PdfCode(
      name,
      department,
      academicSession,
      rollNo,
      regNo,
      bloodGroup,
      address,
      district,
      pinCode,
      studentContactNo,
      guardianNo,
      selectedImage
    );

    try {
      const { uri } = await Print.printToFileAsync({ html });

      const filename = `${rollNo}.pdf`;

      await FileSystem.moveAsync({
        from: uri,
        to: `${FileSystem.documentDirectory}${filename}`,
      });

      console.log("File has been saved as:", filename);

      await shareAsync(`${FileSystem.documentDirectory}${filename}`, {
        UTI: ".pdf",
        mimeType: "application/pdf",
      });
    } catch (err) {
      Alert.alert(err);
    }
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync();
    setSelectedPrinter(printer);
  };
  //=====================================End===============================================//

  ////////////======================Show Alert======================////////////

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const validateForm = () => {
    if (!name) {
      showAlert("Please enter your Name");
      return false;
    }
    if (!department) {
      showAlert("Please select your Department");
      return false;
    }
    if (!academicSession) {
      showAlert("Please enter the Academic Session");
      return false;
    }
    if (!rollNo) {
      showAlert("Please enter the Roll Number");
      return false;
    }
    if (!regNo) {
      showAlert("Please enter the Registration Number");
      return false;
    }
    if (!bloodGroup) {
      showAlert("Please select a Blood Group");
      return false;
    }
    if (!address) {
      showAlert("Please enter your Address");
      return false;
    }
    if (!district) {
      showAlert("Please enter your District");
      return false;
    }
    if (!pinCode) {
      showAlert("Please enter the Pin Code");
      return false;
    }
    if (!studentContactNo) {
      showAlert("Please enter Student's Contact Number");
      return false;
    }
    if (!guardianNo) {
      showAlert("Please enter Guardian's Contact Number");
      return false;
    }
    if (!selectedImage) {
      showAlert("Please Upload your Current Image");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true); 
      await printToFile();
      setLoading(false); 
    }
  };


  //=====================================End===============================================//

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.InputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            value={name}
            onChangeText={(text) => {
              if (/^[A-Za-z ]*$/.test(text) || text === "") {
                setname(text);
              }
            }}
            placeholder="Full Name"
            style={styles.textInput}
            required
          />
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.label}>Department:</Text>
          <View style={styles.PickerContainer}>
            <Picker
              selectedValue={department}
              style={styles.Picker}
              onValueChange={(item, index) => setdepartment(item)}
              required
            >
              <Picker.Item label="Choose" value="" />
              <Picker.Item
                label="Computer Science and Engg."
                value="Computer Science and Engg."
              />
              <Picker.Item
                label="Information Technology"
                value="Information Technology"
              />
              <Picker.Item
                label="Electronics and Communication Engg."
                value="Electronics and Communication Engg."
              />
              <Picker.Item
                label="Electrical Engineering"
                value="Electrical Engineering"
              />
              <Picker.Item
                label="Mechanical Engineering"
                value="Mechanical Engineering"
              />
              <Picker.Item
                label="Civil Engineering"
                value="Civil Engineering"
              />
            </Picker>
          </View>
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.label}>Academic Session:</Text>
          <TextInput
            keyboardType="number-pad"
            value={academicSession}
            maxLength={9}
            onChangeText={(text) => {
              if (/^[\d-]*$/.test(text) || text === "") {
                setacademicSession(text);
              }
            }}
            placeholder="Example: 2020-2024"
            style={styles.textInput}
            required
          />
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.label}>Roll Number:</Text>
          <TextInput
            keyboardType="number-pad"
            value={rollNo}
            maxLength={11}
            onChangeText={(text) => {
              if (/^\d*$/.test(text) || text === "") {
                setrollNo(text);
              }
            }}
            placeholder="Roll Number"
            style={styles.textInput}
            required
          />
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.label}>Registration Number:</Text>
          <TextInput
            keyboardType="number-pad"
            value={regNo}
            maxLength={15}
            onChangeText={(text) => {
              if (/^\d*$/.test(text) || text === "") {
                setregNo(text);
              }
            }}
            placeholder="Registration Number"
            style={styles.textInput}
            required
          />
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.label}>Blood Group:</Text>
          <View style={styles.PickerContainer}>
            <Picker
              selectedValue={bloodGroup}
              style={styles.Picker}
              onValueChange={(item, index) => setbloodGroup(item)}
              required
            >
              <Picker.Item label="Choose" value="" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          </View>
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.label}>Address:</Text>
          <TextInput
            value={address}
            onChangeText={(text) => setaddress(text)}
            placeholder="Address"
            style={styles.textInput}
            required
          />
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.label}>District:</Text>
          <TextInput
            value={district}
            onChangeText={(text) => {
              if (/^[A-Za-z ]*$/.test(text) || text === "") {
                setdistrict(text);
              }
            }}
            placeholder="District"
            style={styles.textInput}
            required
          />
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.label}>Pin Code:</Text>
          <TextInput
            keyboardType="number-pad"
            value={pinCode}
            maxLength={6}
            onChangeText={(text) => {
              if (/^\d*$/.test(text) || text === "") {
                setpinCode(text);
              }
            }}
            placeholder="Pin Code"
            style={styles.textInput}
            required
          />
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.label}>Student's Contact No:</Text>
          <TextInput
            keyboardType="number-pad"
            value={studentContactNo}
            maxLength={10}
            onChangeText={(text) => {
              if (/^\d*$/.test(text) || text === "") {
                setstudentContactNo(text);
              }
            }}
            placeholder="10 Digit Mobile Number"
            style={styles.textInput}
            required
          />
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.label}>Guardian's Contact No:</Text>
          <TextInput
            keyboardType="number-pad"
            value={guardianNo}
            maxLength={10}
            onChangeText={(text) => {
              if (/^\d*$/.test(text) || text === "") {
                setguardianNo(text);
              }
            }}
            placeholder="10 Digit Mobile Number"
            style={styles.textInput}
            required
          />
        </View>

        <View style={styles.InputContainer}>
        <Text style={{ fontWeight: "bold" }}>Upload your Current Image:</Text>
        <View style={styles.chooseImageContainer}>
          <TouchableOpacity onPress={handleImagePicker} style={styles.chooseImageButton}>
            <Text style={styles.chooseImageText}>Choose Image</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          )}
        </View>
      </View>

        <View style={styles.buttonContainer}>
          <Button title="Generate PDF" onPress={handleSubmit} />
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Generating PDF Please Wait ...</Text>
        </View>
      )}


      {alertVisible && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertMessage}>{alertMessage}</Text>
          <TouchableOpacity
            onPress={() => setAlertVisible(false)}
            style={styles.alertButton}
          >
            <Text style={styles.alertButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GenerateIdentity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    paddingTop: 15,
    paddingBottom: 15,
  },
  InputContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
  },
  textInput: {
    marginTop: 4,
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    marginBottom: 6,
    color: "#1A237E",
  },
  PickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    color: "#1A237E",
  },
  button: {
    backgroundColor: "#00CED1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: "#1A237E",
  },
  alertContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertMessage: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alertButton: {
    backgroundColor: "#00CED1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  alertButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  chooseImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  chooseImageButton: {
    backgroundColor: "#00CED1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  chooseImageText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A237E",
  },

});
