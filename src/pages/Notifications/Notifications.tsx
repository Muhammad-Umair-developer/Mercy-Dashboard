import { useState } from "react";
import images from "../../constants/images";

interface Notification {
  id: string | number;
  subject: string;
  message: string;
  status: string;
  timestamp: string;
}

interface Banner {
  id: string | number;
  image: string;
  link?: string;
  status: string;
  timestamp: string;
}

interface Feed {
  id: string | number;
  title: string;
  content: string;
  category: string;
  image?: string;
  status: string;
  timestamp: string;
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("Notification");
  const [isNewNotificationModalOpen, setIsNewNotificationModalOpen] =
    useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });
  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem("banners");
    return saved ? JSON.parse(saved) : [];
  });
  const [feeds, setFeeds] = useState<Feed[]>(() => {
    const saved = localStorage.getItem("feeds");
    return saved ? JSON.parse(saved) : [];
  });
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [bannerFormData, setBannerFormData] = useState({
    image: "",
    link: "",
  });
  const [feedFormData, setFeedFormData] = useState({
    title: "",
    content: "",
    category: "Photo Editing",
    image: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isEditBannerModalOpen, setIsEditBannerModalOpen] = useState(false);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [isEditFeedModalOpen, setIsEditFeedModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Notification | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [editingFeed, setEditingFeed] = useState<Feed | null>(null);

  const tabs = ["Notification", "Banner", "Feeds"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNewNotificationClick = () => {
    setIsNewNotificationModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsNewNotificationModalOpen(false);
    setFormData({ subject: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendNotification = () => {
    if (!formData.subject.trim() || !formData.message.trim()) {
      alert("Please fill in both subject and message fields.");
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newNotification = {
      id: Date.now(),
      subject: formData.subject,
      message: formData.message,
      status: "Delivered",
      timestamp: `${formattedDate} - ${formattedTime}`,
    };

    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    setIsNewNotificationModalOpen(false);
    setFormData({ subject: "", message: "" });
  };

  const handleDeleteCard = (cardId: string | number) => {
    // For static cards, we just remove them from localStorage (they will reappear on refresh)
    // For dynamic cards, we remove them from the state
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== cardId
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    // If it's a static card, we add it to a "deleted static cards" list in localStorage
    if (typeof cardId === "string" && cardId.startsWith("static-")) {
      const deletedStatic = JSON.parse(
        localStorage.getItem("deletedStaticNotifications") || "[]"
      );
      deletedStatic.push(cardId);
      localStorage.setItem(
        "deletedStaticNotifications",
        JSON.stringify(deletedStatic)
      );
    }
  };

  const handleEditCard = (card: any) => {
    setEditingCard(card);
    setFormData({ subject: card.subject, message: card.message });
    setIsEditModalOpen(true);
  };

  const handleUpdateNotification = () => {
    if (!formData.subject.trim() || !formData.message.trim()) {
      alert("Please fill in both subject and message fields.");
      return;
    }

    if (!editingCard) return;

    // For static cards, we need to handle them differently since they're not in the state
    const cardId = editingCard.id;
    if (typeof cardId === "string" && cardId.startsWith("static-")) {
      // Create a new notification with the updated data
      const newNotification = {
        id: Date.now(),
        subject: formData.subject,
        message: formData.message,
        status: editingCard.status,
        timestamp: editingCard.timestamp,
      };

      const updatedNotifications = [newNotification, ...notifications];
      setNotifications(updatedNotifications);
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    } else {
      // Handle regular dynamic notifications
      const updatedNotifications = notifications.map((notification) =>
        notification.id === editingCard.id
          ? {
              ...notification,
              subject: formData.subject,
              message: formData.message,
            }
          : notification
      );

      setNotifications(updatedNotifications);
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    }

    setIsEditModalOpen(false);
    setEditingCard(null);
    setFormData({ subject: "", message: "" });
  };

  const handleResendCard = (card: any) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const resentNotification = {
      id: Date.now(),
      subject: card.subject,
      message: card.message,
      status: "Delivered",
      timestamp: `${formattedDate} - ${formattedTime}`,
    };

    const updatedNotifications = [resentNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCard(null);
    setFormData({ subject: "", message: "" });
  };

  // Banner handlers
  const handleNewBannerClick = () => {
    setIsBannerModalOpen(true);
  };

  const handleCloseBannerModal = () => {
    setIsBannerModalOpen(false);
    setBannerFormData({ image: "", link: "" });
  };

  const handleBannerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBannerFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerFormData((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendBanner = () => {
    if (!bannerFormData.image) {
      alert("Please upload an image for the banner.");
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newBanner = {
      id: Date.now(),
      image: bannerFormData.image,
      link: bannerFormData.link,
      status: "Delivered",
      timestamp: `${formattedDate} - ${formattedTime}`,
    };

    const updatedBanners = [newBanner, ...banners];
    setBanners(updatedBanners);
    localStorage.setItem("banners", JSON.stringify(updatedBanners));

    setIsBannerModalOpen(false);
    setBannerFormData({ image: "", link: "" });
  };

  const handleDeleteBanner = (bannerId: string | number) => {
    const updatedBanners = banners.filter((banner) => banner.id !== bannerId);
    setBanners(updatedBanners);
    localStorage.setItem("banners", JSON.stringify(updatedBanners));

    // If it's a static banner, we add it to a "deleted static banners" list in localStorage
    if (typeof bannerId === "string" && bannerId.startsWith("static-")) {
      const deletedStatic = JSON.parse(
        localStorage.getItem("deletedStaticBanners") || "[]"
      );
      deletedStatic.push(bannerId);
      localStorage.setItem(
        "deletedStaticBanners",
        JSON.stringify(deletedStatic)
      );
    }
  };

  const handleEditBanner = (banner: any) => {
    setEditingBanner(banner);
    setBannerFormData({ image: banner.image, link: banner.link || "" });
    setIsEditBannerModalOpen(true);
  };

  const handleUpdateBanner = () => {
    if (!bannerFormData.image) {
      alert("Please upload an image for the banner.");
      return;
    }

    if (!editingBanner) return;

    // For static banners, create a new banner with the updated data
    const bannerId = editingBanner.id;
    if (typeof bannerId === "string" && bannerId.startsWith("static-")) {
      const newBanner = {
        id: Date.now(),
        image: bannerFormData.image,
        link: bannerFormData.link,
        status: editingBanner.status,
        timestamp: editingBanner.timestamp,
      };

      const updatedBanners = [newBanner, ...banners];
      setBanners(updatedBanners);
      localStorage.setItem("banners", JSON.stringify(updatedBanners));
    } else {
      // Handle regular dynamic banners
      const updatedBanners = banners.map((banner) =>
        banner.id === editingBanner.id
          ? {
              ...banner,
              image: bannerFormData.image,
              link: bannerFormData.link,
            }
          : banner
      );

      setBanners(updatedBanners);
      localStorage.setItem("banners", JSON.stringify(updatedBanners));
    }

    setIsEditBannerModalOpen(false);
    setEditingBanner(null);
    setBannerFormData({ image: "", link: "" });
  };

  const handleResendBanner = (banner: any) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const resentBanner = {
      id: Date.now(),
      image: banner.image,
      link: banner.link,
      status: "Delivered",
      timestamp: `${formattedDate} - ${formattedTime}`,
    };

    const updatedBanners = [resentBanner, ...banners];
    setBanners(updatedBanners);
    localStorage.setItem("banners", JSON.stringify(updatedBanners));
  };

  const handleCloseEditBannerModal = () => {
    setIsEditBannerModalOpen(false);
    setEditingBanner(null);
    setBannerFormData({ image: "", link: "" });
  };

  // Feed handlers
  const handleNewFeedClick = () => {
    setIsFeedModalOpen(true);
  };

  const handleCloseFeedModal = () => {
    setIsFeedModalOpen(false);
    setFeedFormData({
      title: "",
      content: "",
      category: "Photo Editing",
      image: "",
    });
  };

  const handleFeedInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFeedFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFeedFormData((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendFeed = () => {
    if (!feedFormData.title.trim()) {
      alert("Please fill in the subject field.");
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newFeed = {
      id: Date.now(),
      title: feedFormData.title,
      content: feedFormData.content || feedFormData.title, // Use title as content if content is empty
      category: feedFormData.category || "Photo Editing", // Default category if none selected
      image: feedFormData.image,
      status: "Published",
      timestamp: `${formattedDate} - ${formattedTime}`,
    };

    const updatedFeeds = [newFeed, ...feeds];
    setFeeds(updatedFeeds);
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));

    setIsFeedModalOpen(false);
    setFeedFormData({
      title: "",
      content: "",
      category: "Photo Editing",
      image: "",
    });
  };

  const handleDeleteFeed = (feedId: string | number) => {
    const updatedFeeds = feeds.filter((feed) => feed.id !== feedId);
    setFeeds(updatedFeeds);
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));

    // If it's a static feed, we add it to a "deleted static feeds" list in localStorage
    if (typeof feedId === "string" && feedId.startsWith("static-")) {
      const deletedStatic = JSON.parse(
        localStorage.getItem("deletedStaticFeeds") || "[]"
      );
      deletedStatic.push(feedId);
      localStorage.setItem("deletedStaticFeeds", JSON.stringify(deletedStatic));
    }
  };

  const handleEditFeed = (feed: any) => {
    setEditingFeed(feed);
    setFeedFormData({
      title: feed.title,
      content: feed.content,
      category: feed.category,
      image: feed.image || "",
    });
    setIsEditFeedModalOpen(true);
  };

  const handleUpdateFeed = () => {
    if (!feedFormData.title.trim()) {
      alert("Please fill in the title field.");
      return;
    }

    if (!editingFeed) return;

    // For static feeds, create a new feed with the updated data
    const feedId = editingFeed.id;
    if (typeof feedId === "string" && feedId.startsWith("static-")) {
      const newFeed = {
        id: Date.now(),
        title: feedFormData.title,
        content: feedFormData.content || feedFormData.title,
        category: feedFormData.category,
        image: feedFormData.image,
        status: editingFeed.status,
        timestamp: editingFeed.timestamp,
      };

      const updatedFeeds = [newFeed, ...feeds];
      setFeeds(updatedFeeds);
      localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
    } else {
      // Handle regular dynamic feeds
      const updatedFeeds = feeds.map((feed) =>
        feed.id === editingFeed.id
          ? {
              ...feed,
              title: feedFormData.title,
              content: feedFormData.content,
              category: feedFormData.category,
              image: feedFormData.image,
            }
          : feed
      );

      setFeeds(updatedFeeds);
      localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
    }

    setIsEditFeedModalOpen(false);
    setEditingFeed(null);
    setFeedFormData({
      title: "",
      content: "",
      category: "Photo Editing",
      image: "",
    });
  };

  const handleResendFeed = (feed: any) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const resentFeed = {
      id: Date.now(),
      title: feed.title,
      content: feed.content,
      category: feed.category,
      image: feed.image,
      status: "Published",
      timestamp: `${formattedDate} - ${formattedTime}`,
    };

    const updatedFeeds = [resentFeed, ...feeds];
    setFeeds(updatedFeeds);
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
  };

  const handleCloseEditFeedModal = () => {
    setIsEditFeedModalOpen(false);
    setEditingFeed(null);
    setFeedFormData({
      title: "",
      content: "",
      category: "Photo Editing",
      image: "",
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Notification":
        return (
          <div className="">
            {/* Notification Cards */}
            <div className="flex flex-col gap-6 ">
              {/* Dynamic Notifications from Local Storage + Static Cards */}
              {(() => {
                // Combine dynamic notifications with static cards
                const staticCards = [
                  {
                    id: "static-1",
                    subject: "Get the best Service",
                    message:
                      "Edits by Mercy is the best photo editing platform, we offer various services and give the best prices",
                    status: "Delivered",
                    timestamp: "05/09/25 - 08:22AM",
                  },
                  {
                    id: "static-2",
                    subject: "Get the best Service",
                    message:
                      "Edits by Mercy is the best photo editing platform, we offer various services and give the best prices",
                    status: "Delivered",
                    timestamp: "05/09/25 - 08:22AM",
                  },
                  {
                    id: "static-3",
                    subject: "Get the best Service",
                    message:
                      "Edits by Mercy is the best photo editing platform, we offer various services and give the best prices",
                    status: "Delivered",
                    timestamp: "05/09/25 - 08:22AM",
                  },
                ];

                // Filter out deleted static cards
                const deletedStatic = JSON.parse(
                  localStorage.getItem("deletedStaticNotifications") || "[]"
                );
                const filteredStaticCards = staticCards.filter(
                  (card) => !deletedStatic.includes(card.id)
                );

                const allCards = [...notifications, ...filteredStaticCards];
                const rows = [];

                // Group cards into rows of 2
                for (let i = 0; i < allCards.length; i += 2) {
                  const rowCards = allCards.slice(i, i + 2);
                  rows.push(rowCards);
                }

                return rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex flex-row gap-6">
                    {row.map((card) => (
                      <div
                        key={card.id}
                        className={`bg-white rounded-lg border-2 border-[#DADADA] shadow-sm p-6 ${
                          row.length === 1 ? "w-1/2" : "flex-1"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {card.subject}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {card.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6">{card.message}</p>
                        <hr className="mb-4 border-gray-200" />
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleResendCard(card)}
                              className="bg-[#992C55] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
                            >
                              Resend
                            </button>
                            <button
                              onClick={() => handleEditCard(card)}
                              className=" hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <img
                                src={images.edit}
                                alt="Edit"
                                className="w-12 h-12"
                              />
                            </button>
                            <button
                              onClick={() => handleDeleteCard(card.id)}
                              className=" hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <img
                                src={images.delete}
                                alt="Delete"
                                className="w-10 h-10"
                              />
                            </button>
                          </div>
                          <span className="text-sm text-gray-400">
                            {card.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ));
              })()}
            </div>
          </div>
        );
      case "Banner":
        return (
          <div className="">
            {/* Banner Cards */}
            <div className="flex flex-wrap gap-6">
              {/* Dynamic Banners from Local Storage + Static Cards */}
              {(() => {
                // Combine dynamic banners with static cards
                const staticBanners = [
                  {
                    id: "static-banner-1",
                    image:
                      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
                    link: "",
                    status: "Delivered",
                    timestamp: "05/09/25 - 08:22AM",
                  },
                ];

                // Filter out deleted static banners
                const deletedStatic = JSON.parse(
                  localStorage.getItem("deletedStaticBanners") || "[]"
                );
                const filteredStaticBanners = staticBanners.filter(
                  (banner) => !deletedStatic.includes(banner.id)
                );

                const allBanners = [...banners, ...filteredStaticBanners];

                return allBanners.map((banner) => (
                  <div
                    key={banner.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden max-w-md"
                  >
                    {/* Banner Image */}
                    <div className="h-32 bg-gray-200 overflow-hidden">
                      <img
                        src={banner.image}
                        alt="Banner"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Banner Content */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm text-gray-500">
                          {banner.status}
                        </span>
                        <span className="text-sm text-gray-400">
                          {banner.timestamp}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResendBanner(banner)}
                          className="bg-[#992C55] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
                        >
                          Resend
                        </button>
                        <button
                          onClick={() => handleEditBanner(banner)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <img
                            src={images.edit}
                            alt="Edit"
                            className="w-6 h-6"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <img
                            src={images.delete}
                            alt="Delete"
                            className="w-6 h-6"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        );
      case "Feeds":
        return (
          <div className="">
            {/* Feed Cards */}
            <div className="grid grid-cols-3 gap-6">
              {/* Dynamic Feeds from Local Storage + Static Cards */}
              {(() => {
                // Combine dynamic feeds with static cards
                const staticFeeds = [
                  {
                    id: "static-feed-1",
                    title: "Skin Smoothing",
                    content: "200 likes",
                    category: "Photo Editing",
                    image:
                      "https://images.unsplash.com/photo-1494790108755-2616c5e70006?w=400&h=300&fit=crop&crop=face",
                    status: "Published",
                    timestamp: "05/09/25 - 08:22AM",
                  },
                  {
                    id: "static-feed-2",
                    title: "Skin Smoothing",
                    content: "200 likes",
                    category: "Design",
                    image:
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face",
                    status: "Published",
                    timestamp: "05/09/25 - 08:22AM",
                  },
                  {
                    id: "static-feed-3",
                    title: "Skin Smoothing",
                    content: "200 likes",
                    category: "Photography",
                    image:
                      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop&crop=face",
                    status: "Published",
                    timestamp: "05/09/25 - 08:22AM",
                  },
                ];

                // Filter out deleted static feeds
                const deletedStatic = JSON.parse(
                  localStorage.getItem("deletedStaticFeeds") || "[]"
                );
                const filteredStaticFeeds = staticFeeds.filter(
                  (feed) => !deletedStatic.includes(feed.id)
                );

                const allFeeds = [...feeds, ...filteredStaticFeeds];

                return allFeeds.map((feed) => (
                  <div
                    key={feed.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                  >
                    {/* Feed Image */}
                    <div className="h-48 bg-gray-200 overflow-hidden relative">
                      <img
                        src={
                          feed.image ||
                          "https://images.unsplash.com/photo-1494790108755-2616c5e70006?w=400&h=300&fit=crop&crop=face"
                        }
                        alt="Feed"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Feed Content */}
                    <div className="p-4">
                      <div className="mb-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          {feed.title}
                        </h3>
                      </div>

                      {/* Action Buttons and Info */}
                      <div className="flex justify-between items-start">
                        {/* Left side - Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleResendFeed(feed)}
                            className="bg-[#992C55] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
                          >
                            Resend
                          </button>
                          <button
                            onClick={() => handleEditFeed(feed)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer border border-[#DADADA]"
                          >
                            <svg
                              className="w-5 h-5 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteFeed(feed.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer border border-[#DADADA]"
                          >
                            <svg
                              className="w-5 h-5 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Right side - Likes and Date */}
                        <div className="flex flex-col items-end text-right">
                          <span className="text-xs text-gray-500 mb-1">
                            {feed.content}
                          </span>
                          <span className="text-xs text-gray-400">
                            {feed.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="flex justify-between items-center mb-6 mr-6">
        {/* Left side buttons based on active tab */}
        <div className="flex gap-3">
          {activeTab === "Notification" && (
            <button
              onClick={handleNewNotificationClick}
              className="bg-[#992C55] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
            >
              New Notification
            </button>
          )}

          {activeTab === "Banner" && (
            <button
              onClick={handleNewBannerClick}
              className="bg-[#992C55] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
            >
              New Banner
            </button>
          )}

          {activeTab === "Feeds" && (
            <>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
                Photo Editing
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNewFeedClick}
                className="bg-[#992C55] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
              >
                New Post
              </button>
            </>
          )}
        </div>

        {/* Right side tab buttons */}
        <div
          className="flex bg-gray-100 p-1 rounded-lg border border-gray-200"
          style={{ width: "310px", height: "55px" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-[#992C55] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="">{renderTabContent()}</div>

      {/* New Notification Modal */}
      {isNewNotificationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                New Notification
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Subject Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter message subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent"
              />
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter message"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent resize-none"
              />
            </div>

            {/* Upload Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="flex flex-col items-center">
                  <svg
                    className="w-8 h-8 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">Click to upload image</p>
                </div>
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendNotification}
              className="w-full bg-[#992C55] text-white py-3 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
            >
              Send Notification
            </button>
          </div>
        </div>
      )}

      {/* Edit Notification Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Notification
              </h2>
              <button
                onClick={handleCloseEditModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Subject Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter message subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent"
              />
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter message"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent resize-none"
              />
            </div>

            {/* Update Button */}
            <button
              onClick={handleUpdateNotification}
              className="w-full bg-[#992C55] text-white py-3 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
            >
              Update Notification
            </button>
          </div>
        </div>
      )}

      {/* New Banner Modal */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                New Banner
              </h2>
              <button
                onClick={handleCloseBannerModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Upload Banner */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Banner
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {bannerFormData.image ? (
                  <div className="relative">
                    <img
                      src={bannerFormData.image}
                      alt="Banner preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() =>
                        setBannerFormData((prev) => ({ ...prev, image: "" }))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500 mb-2">Select Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="banner-upload"
                    />
                    <label
                      htmlFor="banner-upload"
                      className="cursor-pointer text-[#992C55] text-sm"
                    >
                      Click to upload
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Banner Link */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner link
              </label>
              <input
                type="text"
                name="link"
                value={bannerFormData.link}
                onChange={handleBannerInputChange}
                placeholder="Paste link here (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendBanner}
              className="w-full bg-[#992C55] text-white py-3 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
            >
              Send Banner
            </button>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {isEditBannerModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Banner
              </h2>
              <button
                onClick={handleCloseEditBannerModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Upload Banner */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Banner
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {bannerFormData.image ? (
                  <div className="relative">
                    <img
                      src={bannerFormData.image}
                      alt="Banner preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() =>
                        setBannerFormData((prev) => ({ ...prev, image: "" }))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500 mb-2">Select Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="banner-edit-upload"
                    />
                    <label
                      htmlFor="banner-edit-upload"
                      className="cursor-pointer text-[#992C55] text-sm"
                    >
                      Click to upload
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Banner Link */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner link
              </label>
              <input
                type="text"
                name="link"
                value={bannerFormData.link}
                onChange={handleBannerInputChange}
                placeholder="Paste link here (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent"
              />
            </div>

            {/* Update Button */}
            <button
              onClick={handleUpdateBanner}
              className="w-full bg-[#992C55] text-white py-3 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
            >
              Update Banner
            </button>
          </div>
        </div>
      )}

      {/* New Feed Modal */}
      {isFeedModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">New Post</h2>
              <button
                onClick={handleCloseFeedModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Category Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={feedFormData.category}
                  onChange={handleFeedInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent appearance-none bg-white text-gray-500"
                >
                  <option value="">Select category</option>
                  <option value="Photo Editing">Photo Editing</option>
                  <option value="Design">Design</option>
                  <option value="Photography">Photography</option>
                  <option value="Tips">Tips</option>
                  <option value="News">News</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="title"
                value={feedFormData.title}
                onChange={handleFeedInputChange}
                placeholder="Enter message subject"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent text-gray-500 placeholder-gray-400"
              />
            </div>

            {/* Upload Banner */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Banner
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                {feedFormData.image ? (
                  <div className="relative">
                    <img
                      src={feedFormData.image}
                      alt="Feed preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() =>
                        setFeedFormData((prev) => ({ ...prev, image: "" }))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Select Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFeedImageUpload}
                      className="hidden"
                      id="feed-upload"
                    />
                    <label
                      htmlFor="feed-upload"
                      className="cursor-pointer text-[#992C55] text-sm font-medium hover:text-[#7d1f44] transition-colors"
                    >
                      Click to upload
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Content Field (Hidden in this design but kept for functionality) */}
            <input
              type="hidden"
              name="content"
              value={feedFormData.content || feedFormData.title}
              onChange={handleFeedInputChange}
            />

            {/* Send Post Button */}
            <button
              onClick={handleSendFeed}
              className="w-full bg-[#992C55] text-white py-3 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
            >
              Send Post
            </button>
          </div>
        </div>
      )}

      {/* Edit Feed Modal */}
      {isEditFeedModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Edit Post</h2>
              <button
                onClick={handleCloseEditFeedModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Category Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={feedFormData.category}
                onChange={handleFeedInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent"
              >
                <option value="Photo Editing">Photo Editing</option>
                <option value="Design">Design</option>
                <option value="Photography">Photography</option>
                <option value="Tips">Tips</option>
                <option value="News">News</option>
              </select>
            </div>

            {/* Title Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={feedFormData.title}
                onChange={handleFeedInputChange}
                placeholder="Enter post title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent"
              />
            </div>

            {/* Content Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={feedFormData.content}
                onChange={handleFeedInputChange}
                placeholder="Enter post content"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#992C55] focus:border-transparent resize-none"
              />
            </div>

            {/* Upload Image (Optional) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {feedFormData.image ? (
                  <div className="relative">
                    <img
                      src={feedFormData.image}
                      alt="Feed preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() =>
                        setFeedFormData((prev) => ({ ...prev, image: "" }))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500 mb-2">Select Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFeedImageUpload}
                      className="hidden"
                      id="feed-edit-upload"
                    />
                    <label
                      htmlFor="feed-edit-upload"
                      className="cursor-pointer text-[#992C55] text-sm"
                    >
                      Click to upload
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Update Button */}
            <button
              onClick={handleUpdateFeed}
              className="w-full bg-[#992C55] text-white py-3 rounded-lg font-medium hover:bg-[#7d1f44] transition-colors cursor-pointer"
            >
              Update Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
