import ConnectionApprovedPacket from "./ConnectionApproved";
import ConnectRequestPacket from "./ConnectRequest";
import PlayerAppearancePacket from "./PlayerAppearance";
import SetInventoryPacket from "./SetInventory";

const Packets = {
	1: ConnectRequestPacket,
	3: ConnectionApprovedPacket,
    4: PlayerAppearancePacket,
    5:SetInventoryPacket,
};

export default Packets;
