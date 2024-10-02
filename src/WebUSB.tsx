/// <reference types="w3c-web-serial" />
import React, { useCallback, useState } from "react";
import { HayBoxDevice, DeviceInfo, Config } from "haybox-webserial";
import { FaUsb } from "react-icons/fa";

interface WebUSBProps {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
	onImport: (status: boolean) => void;
}

interface FlashButtonProps {
  config: Config;
  device: HayBoxDevice;
}

const FlashButton: React.FC<FlashButtonProps> = ({ config, device }) => {
  type FlashStatus = "active" | "success" | "error" | null;
  const [flashStatus, setFlashStatus] = useState<FlashStatus>(null);

  const flashSerialDeviceConfig = async (
    device: HayBoxDevice,
    config: Config,
  ) => {
    if (device === undefined || device.serialPort === null) {
      setFlashStatus("error");
      throw new Error("Attempt to import config from bad device");
    }
    const flashSuccess = await device.setConfig(config);
    if (flashSuccess) {
      setFlashStatus("success");
    } else {
      setFlashStatus("error");
    }
  };
  const handleFlash = async () => {
    setFlashStatus("active");
    try {
      await flashSerialDeviceConfig(device, config);
    } catch (err: unknown) {
      console.error(err);
      setFlashStatus("error");
    } finally {
      setTimeout(() => setFlashStatus(null), 3000);
    }
  };

  const getButtonClass = () => {
    if (flashStatus === "active") {
      return "bg-zinc-400 cursor-not-allowed";
    } else {
      return "bg-zinc-300 hover:bg-zinc-200 active:bg-zinc-400";
    }
  };

  return (
    <div className="flex flex-row items-center my-2 p-1">
      <button
        onClick={handleFlash}
        className={`${getButtonClass()} text-zinc-900 font-semibold py-2 px-4 rounded-full`}
      >
        {flashStatus === "active" ? "Flashing..." : "Flash"}
      </button>
      {flashStatus === "success" && (
        <p className="pl-4 text-green-500 text-lg">Success!</p>
      )}
      {flashStatus === "error" && (
        <p className="pl-4 text-red-500">Failure...</p>
      )}
    </div>
  );
};
const WebUSB: React.FC<WebUSBProps> = ({ config, setConfig, onImport }) => {
  const [device, setDevice] = useState<HayBoxDevice | undefined>(undefined);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | undefined>(
    undefined,
  );

  const connectSerialDevice = useCallback(async () => {
    try {
      await device?.serialPort?.close();
      device?.serialPort?.forget();

      const filters = [{ usbVendorId: 0x2e8a, productId: 0x000a }];

      const serialPort = await navigator.serial.requestPort({ filters });

      const connectedDevice = new HayBoxDevice(serialPort);
      setDevice(connectedDevice);

      const newDeviceInfo = await connectedDevice.getDeviceInfo();

      if (newDeviceInfo !== null) {
				onImport(true);
        setDeviceInfo(newDeviceInfo);
      } else {
        throw new Error(
          "Unable to retrieve firmware information from the device",
        );
      }

      const serialDeviceConfig =
        await importSerialDeviceConfig(connectedDevice);
      if (serialDeviceConfig !== null && serialDeviceConfig !== undefined) {
        console.log("imported config: ", serialDeviceConfig);
        setConfig(serialDeviceConfig);
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "NotFoundError") {
        // no port selected by user.
      } else {
        console.error("serial connect fail: ", err);
      }
    }
  }, [device, setConfig, onImport]);

  const disconnectSerialDevice = useCallback(async () => {
    device?.serialPort?.forget();
    setDevice(undefined);
    setDeviceInfo(undefined);
		onImport(false);
  }, [device, onImport]);

  const importSerialDeviceConfig = async (device: HayBoxDevice) => {
    if (device === undefined) {
      throw new Error("Attempt to import config from nonexistent device");
    }
    if (device.serialPort === null) {
      throw new Error("Device has no serial port");
    }

    const importedConfig = await device.getConfig();
    console.log("imported config: ", importedConfig);
    return importedConfig;
  };

  const UsbStatus: React.FC<{ connected: boolean }> = ({ connected }) => (
    <div className="flex flex-row items-center p-2">
      <FaUsb className="text-zinc-300 font-bold h-8 w-8 pr-2" />
      <p className="text-zinc-300 font-bold text-lg">
        {connected ? "Fightform Connected" : "No Fightform Connected..."}
      </p>
    </div>
  );

  return (
    <div className="py-2 px-4 m-4 rounded-xl bg-zinc-700">
      <UsbStatus connected={device !== undefined} />
      {device ? (
        <div>
          <p className="text-zinc-300 pl-2 text-lg">
            Firmware: {deviceInfo?.firmwareName} {deviceInfo?.firmwareVersion}
          </p>
          <FlashButton config={config} device={device} />
          <div className="p-1">
            <button
              onClick={disconnectSerialDevice}
              className="bg-zinc-300 text-zinc-900 font-semibold py-2 px-4 rounded-full hover:bg-zinc-200 active:bg-zinc-400"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2">
          <button
            onClick={connectSerialDevice}
            className="mx-2 bg-zinc-300 text-zinc-900 font-semibold py-2 px-4 rounded-full hover:bg-zinc-200 active:bg-zinc-400"
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
};

export default WebUSB;
