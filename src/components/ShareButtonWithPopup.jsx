import { useState } from "react";
import {
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
  TwitterIcon,
} from "react-share";
import SendSharpIcon from '@mui/icons-material/SendSharp';

const SharePopup = ({ title, content, onClose }) => {
  const shareUrl = window.location.href;
  const shareText = `${title}\n\n${content}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Share This Note</h2>
        <div className="flex gap-3">
          <WhatsappShareButton url={`\n ${shareUrl}`} title={shareText}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <TelegramShareButton url={`${shareUrl}\n`} title={shareText}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>

          <EmailShareButton url={`${shareUrl}\n`} subject={title} body={content} >
            <EmailIcon size={40} round />
          </EmailShareButton>

          <TwitterShareButton url={`\n ${shareUrl}`} title={shareText}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ShareButtonWithPopup = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="px-4 py-2 text-white rounded"
        onClick={() => setIsOpen(true)}
        title="Share"
      >
        <SendSharpIcon/>
      </button>

      {isOpen && (
        <SharePopup
          title={title}
          content={content}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ShareButtonWithPopup;
