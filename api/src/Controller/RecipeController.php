<?php
// src/Controller/RecipeController.php

namespace App\Controller;

use App\Entity\Recipe;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class RecipeController extends AbstractController
{
    #[Route('/recipes/{id}/reviews', name: 'recipe_reviews', methods: ['GET'])]
    public function getReviews(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $recipe = $entityManager->getRepository(Recipe::class)->find($id);

        if (!$recipe) {
            return new JsonResponse(['error' => 'Recipe not found'], 404);
        }

        $reviews = $recipe->getReviews();

        $reviewData = [];
        foreach ($reviews as $review) {
            $reviewData[] = [
                'id' => $review->getId(),
                'rating' => $review->getRating(),
                'body' => $review->body,
                'author' => $review->author,
                'publicationDate' => $review->publicationDate->format('Y-m-d H:i:s'),
            ];
        }

        return new JsonResponse($reviewData);
    }
}
