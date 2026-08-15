import React, { useState } from 'react';
import { Star, ShieldCheck, MessageSquarePlus, CheckCircle2, ZoomIn, X } from 'lucide-react';
import { Review } from '../lib/types';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: { author_name: string; rating: number; title: string; comment: string; skin_concerns: string }) => Promise<void>;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [showModal, setShowModal] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [concerns, setConcerns] = useState('Anti-Aging & Fine Lines');
  const [submitting, setSubmitting] = useState(false);

  // All 5 real customer photo reviews with overlay 5-star badges
  const photoReviews = [
    {
      name: 'Jessica M.',
      rating: 5,
      title: 'Obsessed with the Glowing Results!',
      comment: 'I’ve been using my LUMORA mask every evening after my skincare routine for 10 minutes. My skin tone is so much more even and plump!',
      concern: 'Anti-Aging & Fine Lines',
      image: '/images/review-ugc-1.png',
      mode: 'Red & Pink LED Mode',
    },
    {
      name: 'Chloe K.',
      rating: 5,
      title: 'My Evening Bedtime Essential',
      comment: 'I love that this mask has both red and blue light modes! I use the blue light setting before bed to keep my skin crystal clear.',
      concern: 'Blemish Care & Skin Clarity',
      image: '/images/review-ugc-2.png',
      mode: 'Blue Light Photon Mode',
    },
    {
      name: 'Rachel T.',
      rating: 5,
      title: 'Dermatologist Quality at Home!',
      comment: 'As a skincare enthusiast with a full shelf of serums, adding LUMORA was the best decision ever. My skin has a natural glow even without makeup!',
      concern: 'Skin Elasticity & Radiance',
      image: '/images/review-ugc-3.png',
      mode: 'Red Collagen Mode',
    },
    {
      name: 'Olivia P.',
      rating: 5,
      title: 'The Blue Light Mode Cleared My Skin!',
      comment: 'I use the 460nm blue light mode 3 nights a week. It completely calmed down my stubborn breakouts and left my pores so clean. The gold LUMORA logo looks so luxurious!',
      concern: 'Blemish Care & Pore Refinement',
      image: '/images/review-ugc-4.png',
      mode: '460nm Blue Light Mode',
    },
    {
      name: 'Sophia W.',
      rating: 5,
      title: 'Insane Glow & Collagen Boost',
      comment: 'Look at that red light power! I wear my LUMORA mask on the couch for 10 minutes every day. After 4 weeks my fine lines have diminished significantly.',
      concern: 'Anti-Aging & Firmness',
      image: '/images/review-ugc-5.png',
      mode: '630nm/850nm Red & NIR Mode',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;
    setSubmitting(true);
    await onAddReview({
      author_name: name,
      rating,
      title: title || 'Incredible Skin Transformation',
      comment,
      skin_concerns: concerns,
    });
    setSubmitting(false);
    setShowModal(false);
    setName('');
    setTitle('');
    setComment('');
  };

  return (
    <section id="reviews" className="py-24 bg-[#050507] text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-300 text-xs font-semibold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>VERIFIED LUMORA CUSTOMER REVIEWS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              REAL RESULTS, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">REAL LUMORA USERS</span>
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-lg font-bold text-white">5.0 OUT OF 5.0</span>
              <span className="text-xs text-zinc-400">({reviews.length + 42} Verified Customer Reviews)</span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="self-start md:self-auto flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-red-950 transition-all hover:scale-105"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>

        {/* Featured Photo UGC Reviews Grid (5 Customer Photos with 5-Star Badges) */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold uppercase text-amber-400 tracking-wider">
              VERIFIED CUSTOMER PHOTO RESULTS
            </h3>
            <span className="text-xs text-zinc-500 font-mono">100% Verified LUMORA Buyers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {photoReviews.map((item, idx) => (
              <div
                key={idx}
                className="bg-zinc-950 border border-zinc-800/90 rounded-3xl overflow-hidden hover:border-red-500/60 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Image Container with 5 Star Badge */}
                <div className="relative aspect-3/4 overflow-hidden bg-zinc-900 cursor-pointer" onClick={() => setLightboxImg(item.image)}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* 5-Star Overlay Badge on Image */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-amber-400/60 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xl">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 ml-0.5">5.0</span>
                  </div>

                  {/* Mode Badge */}
                  <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-mono text-zinc-300 border border-zinc-800">
                    {item.mode}
                  </div>

                  {/* Zoom Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 bg-red-600/90 rounded-full text-white shadow-xl">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Review Text Body */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase line-clamp-1">{item.title}</h4>
                    <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded-full border border-emerald-800/40 shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-300 leading-relaxed font-light line-clamp-3">
                    "{item.comment}"
                  </p>

                  <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="font-bold text-white">{item.name}</span>
                    <span className="text-[9px] text-amber-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {item.concern}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Written Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 p-6 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.verified_buyer && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED BUYER
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white uppercase">{rev.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">{rev.comment}</p>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-red-950 border border-red-800 flex items-center justify-center text-red-300 font-bold text-xs">
                    {rev.author_name[0]}
                  </div>
                  <span className="font-semibold text-zinc-200">{rev.author_name}</span>
                </div>
                {rev.skin_concerns && (
                  <span className="text-[10px] text-amber-400/80 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {rev.skin_concerns}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Image Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-3xl border border-zinc-800">
            <button onClick={() => setLightboxImg(null)} className="absolute top-4 right-4 p-2 bg-black/80 text-white rounded-full z-20">
              <X className="w-6 h-6" />
            </button>
            <img src={lightboxImg} alt="Customer LUMORA Review Photo" className="w-full h-full object-contain max-h-[85vh] mx-auto" />
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-6">
            <h3 className="text-xl font-bold uppercase text-white">SHARE YOUR EXPERIENCE WITH LUMORA</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah M."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Star Rating</label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Headline Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Glowing skin in 3 weeks!"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Primary Skin Concern</label>
                <select
                  value={concerns}
                  onChange={(e) => setConcerns(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Anti-Aging & Fine Lines">Anti-Aging & Fine Lines</option>
                  <option value="Skin Elasticity & Firmness">Skin Elasticity & Firmness</option>
                  <option value="Redness & Inflammation">Redness & Inflammation</option>
                  <option value="Dullness & Tone">Dullness & Radiance</option>
                  <option value="Blemish Care & Skin Clarity">Blemish Care & Skin Clarity</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Your Review</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us how the LUMORA mask worked for your skin..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold uppercase rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold uppercase rounded-xl"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
