export default function EventDescription() {
  return (
    <div
      className="bg-[#020e1e] py-10 px-10 relative "
      style={{
        backgroundImage: "url('/Line.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.8,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Event Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Event Description</h2>
          <p className="text-base mb-4">
            Get ready to kick off the Christmas season in Mumbai with <strong>SOUND OF CHRISTMAS</strong> - your
            favourite <strong>LIVE Christmas concert!</strong>
          </p>
          <p className="text-base mb-4 italic">
            City Youth Movement invites you to the 4th edition of our annual Christmas festivities - by the youth and for the youth! Feat. your favourite worship leaders, carols, quizzes and some exciting surprises!
          </p>
          <p className="text-base">
            Bring your family and friends and sing along your favourite Christmas carols on the 2nd of December, 6:30 PM onwards at the Bal Gandharva Rang Mandir, Bandra West. Book your tickets now!
          </p>
        </div>

        {/* Reasons to Attend */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">3 Reasons to attend the event:</h3>
          <ul className="list-decimal list-inside space-y-2">
            <li>The FIRST Christmas concert of Mumbai!</li>
            <li>A Special Christmas Choir!</li>
            <li>Special Dance performances and many more surprises!</li>
          </ul>
        </div>

    {/* Tags Section */}
<div>
  <h3 className="text-xl font-semibold mb-4">Tags</h3>
  <div className="flex flex-wrap gap-3">
    <span className="border border-gray-700 text-white px-4 py-2 rounded-full text-sm">Holiday Concert</span>
    <span className="border border-gray-700 text-white px-4 py-2 rounded-full text-sm">Live Performance</span>
    <span className="border border-gray-700 text-white px-4 py-2 rounded-full text-sm">Seasonal Event</span>
    <span className="border border-gray-700 text-white px-4 py-2 rounded-full text-sm">Family-Friendly</span>
    <span className="border border-gray-700 text-white px-4 py-2 rounded-full text-sm">#Christmas_Spirit</span>
    <span className="border border-gray-700 text-white px-4 py-2 rounded-full text-sm">#Christmas_Carols</span>
  </div>
</div>

      </div>
    </div>
  );
}
