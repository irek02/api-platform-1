<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/** A recipe. */
#[ORM\Entity]
#[ApiResource]
class Recipe
{
    /** The ID of this recipe. */
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    /** The title of this recipe. */
    #[ORM\Column]
    public string $title = '';

    /** The description of this recipe. */
    #[ORM\Column(type: 'text')]
    public string $description = '';

    /** @var Review[] Available reviews for this recipe. */
    #[ORM\OneToMany(targetEntity: Review::class, mappedBy: 'recipe', cascade: ['persist', 'remove'])]
    public iterable $reviews;

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReviews(): iterable
    {
        return $this->reviews;
    }

    public function getAverageRating(): float
    {
        $totalRating = 0;
        $reviewCount = count($this->reviews);

        if ($reviewCount === 0) {
            return 0;
        }

        foreach ($this->reviews as $review) {
            $totalRating += $review->getRating();
        }

        return round($totalRating / $reviewCount, 2);
    }
}
