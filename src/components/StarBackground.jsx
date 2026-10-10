import { useRef, useState } from "react";

const generateStars = () => {
  const numberOfStars = Math.floor(
    (window.innerWidth * window.innerHeight) / 10000,
  );

  return Array.from({ length: numberOfStars }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.5,
    animationDuration: Math.random() * 4 + 2,
  }));
};

const createMeteor = (id, maxDelay) => ({
  id,
  size: Math.random() * 2 + 1,
  x: Math.random() * 100,
  y: Math.random() * 30 - 10, // starts near or just above the top edge
  angle: 215 + Math.random() * 40, // all fall downward-right, slight variation
  distance: 600 + Math.random() * 600,
  delay: Math.random() * maxDelay,
  animationDuration: Math.random() * 3 + 2,
});

export const StarBackground = () => {
  const [stars] = useState(generateStars);
  const nextId = useRef(4);
  const [meteors, setMeteors] = useState(() =>
    Array.from({ length: 4 }, (_, i) => createMeteor(i, 10)),
  );

  // when a meteor finishes a run, replace it with a brand new random one
  const respawnMeteor = (id) => {
    const newId = nextId.current++;
    setMeteors((prev) =>
      prev.map((m) => (m.id === id ? createMeteor(newId, 5) : m)),
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          onAnimationIteration={() => respawnMeteor(meteor.id)}
          style={{
            width: meteor.size * 50 + "px",
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
            "--angle": meteor.angle + "deg",
            "--distance": meteor.distance + "px",
          }}
        />
      ))}
    </div>
  );
};
