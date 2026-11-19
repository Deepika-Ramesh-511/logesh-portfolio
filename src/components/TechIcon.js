import React from 'react';
import { SiLaravel } from '@react-icons/all-files/si/SiLaravel';
import { SiPhp } from '@react-icons/all-files/si/SiPhp';
import { SiMysql } from '@react-icons/all-files/si/SiMysql';
import { SiRedis } from '@react-icons/all-files/si/SiRedis';
import { SiDocker } from '@react-icons/all-files/si/SiDocker';
import { SiReact } from '@react-icons/all-files/si/SiReact';
import { SiTailwindcss } from '@react-icons/all-files/si/SiTailwindcss';
import { SiBootstrap } from '@react-icons/all-files/si/SiBootstrap';
import { SiPostman } from '@react-icons/all-files/si/SiPostman';
import { SiGit } from '@react-icons/all-files/si/SiGit';
import { SiGithub } from '@react-icons/all-files/si/SiGithub';
import { SiNginx } from '@react-icons/all-files/si/SiNginx';
import { SiJavascript } from '@react-icons/all-files/si/SiJavascript';

import { FaEnvelope } from '@react-icons/all-files/fa/FaEnvelope';
import { FaPhone } from '@react-icons/all-files/fa/FaPhone';
import { FaMapMarkerAlt } from '@react-icons/all-files/fa/FaMapMarkerAlt';
import { FaDownload } from '@react-icons/all-files/fa/FaDownload';
import { FaExternalLinkAlt } from '@react-icons/all-files/fa/FaExternalLinkAlt';
import { FaGraduationCap } from '@react-icons/all-files/fa/FaGraduationCap';
import { FaBriefcase } from '@react-icons/all-files/fa/FaBriefcase';
import { FaCode } from '@react-icons/all-files/fa/FaCode';
import { FaServer } from '@react-icons/all-files/fa/FaServer';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import { FaCogs } from '@react-icons/all-files/fa/FaCogs';
import { FaLayerGroup } from '@react-icons/all-files/fa/FaLayerGroup';
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle';
import { FaPaperPlane } from '@react-icons/all-files/fa/FaPaperPlane';
import { FaTerminal } from '@react-icons/all-files/fa/FaTerminal';
import { FaCopy } from '@react-icons/all-files/fa/FaCopy';
import { FaSun } from '@react-icons/all-files/fa/FaSun';
import { FaMoon } from '@react-icons/all-files/fa/FaMoon';
import { FaBars } from '@react-icons/all-files/fa/FaBars';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import { FaNetworkWired } from '@react-icons/all-files/fa/FaNetworkWired';
import { FaShieldAlt } from '@react-icons/all-files/fa/FaShieldAlt';
import { FaBolt } from '@react-icons/all-files/fa/FaBolt';
import { FaRegClock } from '@react-icons/all-files/fa/FaRegClock';
import { FaFilePdf } from '@react-icons/all-files/fa/FaFilePdf';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import { FaPlay } from '@react-icons/all-files/fa/FaPlay';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';
import { FaLock } from '@react-icons/all-files/fa/FaLock';
import { FaUnlock } from '@react-icons/all-files/fa/FaUnlock';
import { FaSignOutAlt } from '@react-icons/all-files/fa/FaSignOutAlt';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { FaKey } from '@react-icons/all-files/fa/FaKey';
import { FaEye } from '@react-icons/all-files/fa/FaEye';
import { FaEyeSlash } from '@react-icons/all-files/fa/FaEyeSlash';
import { FaHandPeace } from '@react-icons/all-files/fa/FaHandPeace';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaSync } from '@react-icons/all-files/fa/FaSync';
import { FaCog } from '@react-icons/all-files/fa/FaCog';
import { FaList } from '@react-icons/all-files/fa/FaList';
import { FaTable } from '@react-icons/all-files/fa/FaTable';
import { FaWifi } from '@react-icons/all-files/fa/FaWifi';
import { FaExclamationTriangle } from '@react-icons/all-files/fa/FaExclamationTriangle';
import { FaCloudUploadAlt } from '@react-icons/all-files/fa/FaCloudUploadAlt';

const iconMap = {
  SiLaravel,
  SiPhp,
  SiMysql,
  SiRedis,
  SiDocker,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiPostman,
  SiGit,
  SiGithub,
  SiNginx,
  SiJavascript,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaDownload,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaServer,
  FaDatabase,
  FaCogs,
  FaLayerGroup,
  FaCheckCircle,
  FaPaperPlane,
  FaTerminal,
  FaCopy,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaNetworkWired,
  FaShieldAlt,
  FaBolt,
  FaRegClock,
  FaFilePdf,
  FaCheck,
  FaArrowRight,
  FaPlay,
  FaSearch,
  FaLock,
  FaUnlock,
  FaSignOutAlt,
  FaUser,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaHandPeace,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSync,
  FaCog,
  FaList,
  FaTable,
  FaWifi,
  FaExclamationTriangle,
  FaCloudUploadAlt
};

export default function TechIcon({ name, className = '', size = 20, color, style = {} }) {
  const IconComponent = iconMap[name] || FaCode;
  return <IconComponent className={className} size={size} color={color} style={style} />;
}
