import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AddressInput = ({ setProChoice, setDisChoice, setWardChoice }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [code, setCode] = useState({});
  const defaultProvinceRef = useRef();

  const funcGetProvince = async () => {
    try {
      const res = await axios.get(`https://provinces.open-api.vn/api/p/`);
      if (res.data) {
        console.log(res.data);
        const arr = await res.data?.map((item) => {
          return {
            name: item.name,
            code: item.code,
          };
        });
        console.log(arr);
        setProvinces(arr || []);
      } else setProvinces([]);
    } catch (err) {
      console.log(err);
      setProvinces([]);
    }
  };

  const provinceRef = useRef();
  provinceRef.current = funcGetProvince;

  const funcGetDistrict = async (code) => {
    try {
      const res = await axios.get(
        `https://provinces.open-api.vn/api/p/${code}?depth=2`
      );
      if (res.data) {
        console.log(res.data);
        const arr = await res.data?.districts.map((item) => {
          return {
            name: item.name,
            code: item.code,
          };
        });
        console.log(arr);
        setDistricts(arr || []);
      } else setDistricts([]);
    } catch (err) {
      console.log(err);
      setDistricts([]);
    }
  };

  const districtRef = useRef();
  districtRef.current = funcGetDistrict;

  const funcGetWard = async (code) => {
    try {
      const res = await axios.get(
        `https://provinces.open-api.vn/api/d/${code}?depth=2`
      );
      if (res.data) {
        console.log(res.data);
        const arr = await res.data?.wards.map((item) => {
          return {
            name: item.name,
            code: item.code,
          };
        });
        console.log(arr);
        setWards(arr || []);
      } else setWards([]);
    } catch (err) {
      console.log(err);
      setWards([]);
    }
  };

  const wardRef = useRef();
  wardRef.current = funcGetWard;

  useEffect(() => {
    provinceRef.current();
    return () => {
      setProvinces([]);
    };
  }, []);

  useEffect(() => {
    if (code.codePro) districtRef.current(code.codePro);
    return () => {
      setDistricts([]);
    };
  }, [code.codePro]);

  useEffect(() => {
    if (code.codeDis) wardRef.current(code.codeDis);
    return () => {
      setWards([]);
    };
  }, [code.codeDis]);

  const handleProvince = async (e) => {
    console.log(e.target);
    const selectedProvinceCode = e.target.value;
    console.log(selectedProvinceCode);
    console.log(provinces);
    const selectedProvince = provinces.find(
      (item) => item.code == selectedProvinceCode
    );
    console.log(selectedProvince);
    setCode({
      codePro: selectedProvinceCode,
    });
    setProChoice(selectedProvince?.name || "");
    setDisChoice("");
    setWardChoice("");
  };

  const handleDistrict = (e) => {
    console.log(e.target);
    const selectedDistrictCode = e.target.value;
    console.log(selectedDistrictCode);
    const selectedDistrict = districts.find(
      (item) => item.code == selectedDistrictCode
    );
    console.log(selectedDistrict);
    setCode((prev) => ({
      ...prev,
      codeDis: selectedDistrictCode,
    }));
    setDisChoice(selectedDistrict?.name || "");
    setWardChoice("");
  };

  const handleWard = (e) => {
    const selectedWardCode = e.target.value;
    const selectedWard = wards.find((item) => item.code == selectedWardCode);
    setCode((prev) => ({
      ...prev,
      codeWard: selectedWardCode,
    }));
    setWardChoice(selectedWard?.name || "");
  };

  return (
    <div className="flex items-center gap-1">
      <div className="w-52">
        <select
          name="province"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          ref={defaultProvinceRef}
          onChange={handleProvince}
        >
          <option value="-1"> -- Chosen province -- </option>
          {provinces.map((item, index) => (
            <option key={index} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-48">
        <select
          type="text"
          name="district"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          onChange={handleDistrict}
        >
          <option value="-1"> -- Chosen district -- </option>
          {districts.map((item, index) => (
            <option key={index} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-48">
        <select
          type="text"
          name="ward"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="--Chosen ward--"
          onChange={handleWard}
        >
          <option value="-1"> -- Chosen ward -- </option>
          {wards.map((item, index) => (
            <option key={index} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

AddressInput.propTypes = {
  setProChoice: PropTypes.func,
  setDisChoice: PropTypes.func,
  setWardChoice: PropTypes.func,
};

export default AddressInput;
